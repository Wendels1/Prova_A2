import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import CepService from '../services/CepService';
import axios from 'axios';

export default function SalvarCepScreen({ navigation, route }) {

  const cepAntigo = route.params || {};

  const [cep, setCep] = useState(cepAntigo.cep || '');
  const [logradouro, setLogradouro] = useState(cepAntigo.logradouro || '');
  const [bairro, setBairro] = useState(cepAntigo.bairro || '');
  const [cidade, setCidade] = useState(cepAntigo.cidade || '');
  const [estado, setEstado] = useState(cepAntigo.estado || '');

  const [loading, setLoading] = useState(false);

  async function buscarCep() {
    if (cep.length !== 9) {
      alert('Digite um CEP válido com 8 números!');
      return;
    }

    setLoading(true);

    const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep.replace('-', '')}`);
    const data = response.data;

    setLogradouro(data.street || '');
    setBairro(data.neighborhood || '');
    setCidade(data.city || '');
    setEstado(data.state || '');

    setLoading(false);
  }

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

  async function salvar() {
    if (!validarCampos()) return;

    const novoCep = {
      cep,
      logradouro,
      bairro,
      cidade,
      estado,
    };

    if (cepAntigo.id) {
      novoCep.id = cepAntigo.id;
      await CepService.atualizar(novoCep);
      alert('CEP atualizado com sucesso!');
    } else {
      await CepService.salvar(novoCep);
      alert('CEP salvo com sucesso!');
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'ListaCeps' }]
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

      <Text variant="titleLarge" style={{ marginBottom: 10 }}>
        {cepAntigo.id ? `Editar CEP ID: ${cepAntigo.id}` : 'Novo CEP'}
      </Text>

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
