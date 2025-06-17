import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import CepService from '../services/CepService';
import axios from 'axios';

export default function SalvarCepScreen({ navigation, route }) {

  // Pega os parâmetros da rota, se houver
  // Isso é útil para editar um CEP existente
  const cepAntigo = route.params || {};

  // Estados para armazenar os dados do CEP
  // Se for um novo CEP, os valores iniciais serão vazios
  const [cep, setCep] = useState(cepAntigo.cep || '');
  const [logradouro, setLogradouro] = useState(cepAntigo.logradouro || '');
  const [bairro, setBairro] = useState(cepAntigo.bairro || '');
  const [cidade, setCidade] = useState(cepAntigo.cidade || '');
  const [estado, setEstado] = useState(cepAntigo.estado || '');

  // Estado para controlar o carregamento ao buscar o CEP
  // Isso desabilita os campos enquanto a busca está em andamento
  const [loading, setLoading] = useState(false);

  // Função para buscar os dados do CEP na API
  async function buscarCep() {

    // Verifica se o CEP está vazio ou não tem o formato correto
    if (cep.length !== 9) {
      alert('Digite um CEP válido com 8 números!');
      return;
    }

    // Reseta os campos antes de buscar
    setLoading(true);

    // Faz a requisição para a API BrasilAPI
    // Remove o hífen do CEP para a requisição
    const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep.replace('-', '')}`);
    const data = response.data;

    // Verifica se a resposta contém os dados esperados
    // Se a API não retornar bairro, cidade ou estado, mantém os valores atuais
    setLogradouro(data.street || '');
    setBairro(data.neighborhood || '');
    setCidade(data.city || '');
    setEstado(data.state || '');

    // Se a API não retornar logradouro, bairro, cidade ou estado, exibe um alerta
    setLoading(false);
  }

  // Função para validar os campos antes de salvar
  // Exibe alertas se algum campo obrigatório estiver vazio ou inválido
  function validarCampos() {
    if (!cep || cep.length !== 9) {
      alert('Informe um CEP válido!');
      return false;
    }
    if (!logradouro) {
      alert('Informe o logradouro!');
      return false;
    }
    if (!bairro) {
      alert('Informe o bairro!');
      return false;
    }
    if (!cidade) {
      alert('Informe a cidade!');
      return false;
    }
    if (!estado) {
      alert('Informe o estado!');
      return false;
    }
    return true;
  }

  // Função para salvar ou atualizar o CEP
  async function salvar() {
    // Valida os campos antes de prosseguir
    if (!validarCampos()) return;

    // Se todos os campos estiverem válidos, cria o objeto do novo CEP
    const novoCep = {
      cep,
      logradouro,
      bairro,
      cidade,
      estado,
    };

    // Se o CEP antigo tiver um ID, atualiza o CEP existente
    // Caso contrário, salva um novo CEP
    if (cepAntigo.id) {
      novoCep.id = cepAntigo.id;
      await CepService.atualizar(novoCep);
      alert('CEP atualizado com sucesso!');
    } else {
      await CepService.salvar(novoCep);
      alert('CEP salvo com sucesso!');
    }

    // Redireciona para a lista de CEPs
    navigation.reset({
      index: 0,
      routes: [{ name: 'ListaCeps' }]
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

      {/* Título da tela */}
      <Text variant="titleLarge" style={{ marginBottom: 10 }}>
        {/* Exibe "Editar CEP" se houver um ID, caso contrário exibe "Novo CEP" */}
        {cepAntigo.id ? `Editar CEP ID: ${cepAntigo.id}` : 'Novo CEP'}
      </Text>


      {/* Campo Cep Com mascara */}
      <TextInputMask
        type={'custom'}
        options={{ mask: '99999-999' }}
        value={cep}
        onChangeText={setCep}
        style={styles.input}
        placeholder="CEP"
        keyboardType="numeric"
        onBlur={buscarCep}
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

      <Button
        mode="contained"
        icon="content-save"
        onPress={salvar}
        loading={loading}
        disabled={loading}
        style={styles.input}
      >
        Salvar
      </Button>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  input: {
    width: '90%',
    marginBottom: 12,
    backgroundColor: 'white',
  },
});
