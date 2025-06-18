import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackRoutes from './StackRoutes';
import SobreScreen from '../screens/SobreScreen';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    
    // Define as rotas do Drawer Navigator
    // Cada rota pode ter seu próprio componente e opções de título
    <Drawer.Navigator>
      <Drawer.Screen name="Ceps" component={StackRoutes} options={{ title: 'Lista de Ceps' }} />
      <Drawer.Screen name="Sobre" component={SobreScreen} options={{ title: 'Sobre o App' }} />
    </Drawer.Navigator>
  );
}
