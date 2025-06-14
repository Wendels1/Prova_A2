import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';

export default function SobreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Content>
          <Text style={styles.titulo}>Sobre o Aplicativo</Text>

          <Text style={styles.texto}>
            Este aplicativo foi desenvolvido para gerenciar e consultar CEPs.
          </Text>

          <Text style={styles.texto}>
            As consultas de CEP são feitas através da API pública BrasilAPI.
          </Text>

          <Text style={styles.texto}>
            Tecnologias utilizadas: React Native, React Navigation, AsyncStorage e Axios.
          </Text>

          <Text style={styles.texto}>
            Desenvolvedor: Wendel Ferreira Santos
          </Text>

          <Text style={styles.texto}>
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
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  texto: {
    fontSize: 16,
    marginBottom: 8,
  },
});
