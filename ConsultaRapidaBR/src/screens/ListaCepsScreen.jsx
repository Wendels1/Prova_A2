import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import CepService from '../services/CepService';

export default function ListaCepsScreen({ navigation }) {

  // Estado para armazenar a lista de CEPs
  // Inicialmente, a lista está vazia
  const [ceps, setCeps] = useState([]);

  // Buscar a lista de CEPs quando o componente for montado
  useEffect(() => {
    buscarCeps();
  }, []);

  // Recarregar lista sempre que voltar para esta tela
  // Isso garante que a lista esteja atualizada após adicionar ou editar um CEP
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', buscarCeps);
    return unsubscribe;
  }, [navigation]);

  // Função para buscar a lista de CEPs do serviço
  // Utiliza o CepService para obter os dados
  async function buscarCeps() {
    const listaCeps = await CepService.listar();
    setCeps(listaCeps);
  }

  // Função para excluir um CEP
  // Exibe um alerta de confirmação antes de excluir
  // Se confirmado, chama o serviço para remover o CEP e atualiza a lista
  // Se a exclusão for bem-sucedida, exibe um alerta de sucesso
  async function excluirCep(id) {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este CEP?',
      [
        { text: 'Cancelar' },
        {
          text: 'Excluir',
          onPress: async () => {
            await CepService.remover(id);
            buscarCeps();
            alert('CEP excluído com sucesso!');
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>

      {/* Botão para navegar para a tela de cadastro de CEP */}
      <Button
        style={{ margin: 10 }}
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('SalvarCep')}
      >
        Cadastrar
      </Button>

      {/* Lista de CEPs utilizando FlatList */}
      {/* Renderiza cada item da lista utilizando o componente Card */}
      <FlatList
        data={ceps}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>CEP: {item.cep}</Text>
              <Text>Logradouro: {item.logradouro}</Text>
              <Text>Bairro: {item.bairro}</Text>
              <Text>Cidade: {item.cidade}</Text>
              <Text>Estado: {item.estado}</Text>
            </Card.Content>
            {/* Ações do Card para editar e excluir o CEP */}
            <Card.Actions>
              <Button onPress={() => navigation.navigate('EditarCep', { id: item.id })} icon="pencil">
                Editar
              </Button>
              <Button onPress={() => excluirCep(item.id)} icon="delete">
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
  },
});
