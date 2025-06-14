import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function SobreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">Sobre o Aplicativo</Text>

          <Text variant="bodyMedium" style={styles.paragraph}>
            Este aplicativo foi desenvolvido para gerenciar e consultar CEPs usando React Native,
            React Navigation, AsyncStorage e APIs públicas.
          </Text>

          <Text variant="bodyMedium" style={styles.paragraph}>
            Desenvolvedor: Wendel Ferreira Santos
          </Text>

          <Text variant="bodyMedium" style={styles.paragraph}>
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
  paragraph: {
    marginTop: 10,
  },
});
