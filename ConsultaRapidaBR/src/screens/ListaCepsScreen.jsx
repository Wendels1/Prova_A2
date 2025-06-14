import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import CepService from '../services/CepService';

export default function ListaCepsScreen({ navigation }) {
  const [ceps, setCeps] = useState([]);

  useEffect(() => {
    buscarCeps();
  }, []);

  // Recarregar lista sempre que voltar para esta tela
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', buscarCeps);
    return unsubscribe;
  }, [navigation]);

  async function buscarCeps() {
    const listaCeps = await CepService.listar();
    setCeps(listaCeps);
  }

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
      <Button
        style={{ margin: 10 }}
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate('SalvarCep')}
      >
        Cadastrar
      </Button>

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
