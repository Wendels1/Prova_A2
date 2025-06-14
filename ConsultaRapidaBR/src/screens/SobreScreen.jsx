import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';

export default function SobreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Content>
          <Title>Sobre o Aplicativo</Title>

          <Text style={styles.text}>
            Este aplicativo foi desenvolvido para gerenciar e consultar CEPs utilizando tecnologias como React Native, React Navigation e AsyncStorage.
          </Text>

          <Text style={styles.text}>
            As consultas de CEP são feitas através da API pública BrasilAPI.
          </Text>

          <Text style={styles.text}>
            Desenvolvedor: Wendel Ferreira Santos
          </Text>

          <Text style={styles.text}>
            Versão: 1.0.0
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
  },
});
