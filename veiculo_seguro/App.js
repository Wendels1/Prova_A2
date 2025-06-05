import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './src/routes/StackRoutes';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </PaperProvider>
  );
}
