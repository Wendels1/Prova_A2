// src/services/CepService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Implementação do serviço de CEPs usando AsyncStorage
const STORAGE_KEY = '@ceps';

// Funções do serviço
async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(cepObj) {
  cepObj.id = new Date().getTime();
  const ceps = await listar();
  ceps.push(cepObj);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ceps));
}

async function buscar(id) {
  const ceps = await listar();
  return ceps.find(cep => cep.id === id);
}

async function atualizar(novoCep) {
  const ceps = await listar();
  const novaLista = ceps.map(cep => cep.id === novoCep.id ? novoCep : cep);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

async function remover(id) {
  const ceps = await listar();
  const novaLista = ceps.filter(cep => cep.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  atualizar,
  remover
};
