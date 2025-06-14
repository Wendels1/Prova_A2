import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerRoutes from './src/routes/DrawerRoutes';
import { Provider as PaperProvider } from 'react-native-paper';


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
    </PaperProvider>
  );
}


