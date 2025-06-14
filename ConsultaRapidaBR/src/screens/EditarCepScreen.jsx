import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import CepService from '../services/CepService';
import axios from 'axios';

export default function EditarCepScreen({ navigation, route }) {
  // Rota recebe o ID do CEP a ser editado
  const { id } = route.params;
  // Estados para armazenar os dados do CEP
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  // Estado para controlar o loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Função para buscar os dados do CEP usando o serviço
    async function carregarCep() {
      // Verifica se o ID foi passado corretamente
      const cepData = await CepService.buscar(id);
      // Se não encontrar o CEP, exibe um alerta e volta para a tela anterior
      if (cepData) {
        setCep(cepData.cep);
        setLogradouro(cepData.logradouro);
        setBairro(cepData.bairro);
        setCidade(cepData.cidade);
        setEstado(cepData.estado);
      } else {
        Alert.alert('Erro', 'CEP não encontrado');
        navigation.goBack();
      }
    }
    // Chama a função para carregar os dados do CEP
    carregarCep();
  }, [id]);

  // Função para buscar os dados do CEP na API quando o usuário sair do campo
  async function buscarCep() {
    // Verifica se o CEP tem o formato correto
    if (cep.length !== 9) {
      Alert.alert('Erro', 'Digite um CEP válido com 8 números');
      return;
    }
    setLoading(true);

    // Faz a requisição para a API de CEPs
    const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep.replace('-', '')}`);
    // Verifica se a resposta contém os dados esperados
    const data = response.data;
    // Se não encontrar os dados, exibe um alerta
    setLogradouro(data.street || '');
    setBairro(data.neighborhood || '');
    setCidade(data.city || '');
    setEstado(data.state || '');

    // Se não encontrar o logradouro, exibe um alerta
    setLoading(false);
  }

  // Função para validar os campos antes de salvar
  function validarCampos() {
    if (!cep || cep.length !== 9) {
      Alert.alert('Erro', 'Informe um CEP válido');
      return false;
    }
    if (!logradouro) {
      Alert.alert('Erro', 'Informe o logradouro');
      return false;
    }
    if (!bairro) {
      Alert.alert('Erro', 'Informe o bairro');
      return false;
    }
    if (!cidade) {
      Alert.alert('Erro', 'Informe a cidade');
      return false;
    }
    if (!estado) {
      Alert.alert('Erro', 'Informe o estado');
      return false;
    }
    return true;
  }

  // Função para salvar as alterações do CEP
  async function salvar() {
    // Valida os campos antes de prosseguir
    if (!validarCampos()) return;

    // Cria um objeto com os dados do CEP atualizado
    const cepAtualizado = {
      id,
      cep,
      logradouro,
      bairro,
      cidade,
      estado,
    };

    // Inicia o loading
    await CepService.atualizar(cepAtualizado);
    // Exibe um alerta de sucesso e volta para a tela anterior
    Alert.alert('Sucesso', 'CEP atualizado com sucesso!');
    // Limpa os campos
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInputMask
        type={'custom'}
        options={{
          mask: '99999-999'
        }}
        value={cep}
        // Atualiza o estado do CEP com a máscara
        onChangeText={text => setCep(text)}
        style={styles.input}
        placeholder="CEP"
        keyboardType="numeric"
        onBlur={buscarCep}
        // Desabilita o campo se estiver carregando
        editable={!loading}
      />
      <TextInput
        label="Logradouro"
        value={logradouro}
        onChangeText={setLogradouro}
        style={styles.input}
        disabled={loading}
      />
      <TextInput
        label="Bairro"
        value={bairro}
        onChangeText={setBairro}
        style={styles.input}
        disabled={loading}
      />
      <TextInput
        label="Cidade"
        value={cidade}
        onChangeText={setCidade}
        style={styles.input}
        disabled={loading}
      />
      <TextInput
        label="Estado"
        value={estado}
        onChangeText={setEstado}
        style={styles.input}
        disabled={loading}
      />
      {/* Botão para salvar as alterações */}
      <Button mode="contained" onPress={salvar} loading={loading} disabled={loading}>
        Atualizar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
});
