import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar, Card, Divider, Text } from 'react-native-paper';

export default function VeiculoDetalhesScreen({ route }) {
  const veiculo = route.params;
  const [infoFipe, setInfoFipe] = useState(null);

  useEffect(() => {
    if (veiculo.marca && veiculo.modelo && veiculo.ano) {
      console.log('Veiculo recebido via route.params:', veiculo);
      axios.get(`https://brasilapi.com.br/api/fipe/preco/v1/${veiculo.marca}/${veiculo.modelo}/${veiculo.ano}`)
        .then(res => {
          setInfoFipe(res.data);
        })
        .catch(err => alert('Erro ao buscar dados FIPE.'));
    }
  }, []);

  return (
    <ScrollView>
      <Card style={{ margin: 16 }}>
        <Card.Title
          title={`${veiculo.marca} ${veiculo.modelo}`}
          subtitle={`Placa: ${veiculo.placa}`}
          left={(props) => <Avatar.Icon {...props} icon="car" />}
        />
        <Card.Content>
          <Text variant="titleMedium">Dados do Veículo</Text>
          <Text>Renavam: {veiculo.renavam}</Text>
          <Text>Ano: {veiculo.ano}</Text>

          <Text style={{ marginTop: 16 }} variant="titleMedium">Informações da Tabela FIPE</Text>
          {infoFipe ? (
            <>
              <Text>Marca: {infoFipe.marca}</Text>
              <Text>Modelo: {infoFipe.modelo}</Text>
              <Text>Ano Modelo: {infoFipe.anoModelo}</Text>
              <Text>Valor Médio: R$ {infoFipe.valor.toFixed(2)}</Text>
              <Text>Combustível: {infoFipe.combustivel}</Text>
              <Text>Mês Referência: {infoFipe.mesReferencia}</Text>
            </>
          ) : (
            <Text>Carregando dados FIPE...</Text>
          )}

          <Divider style={{ marginVertical: 12 }} />
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
