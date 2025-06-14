import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackRoutes from './StackRoutes';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      {/* Stack inteiro dentro do Drawer */}
      <Drawer.Screen name="Home" component={StackRoutes} options={{ title: 'CEPs' }} />
      {/* Se quiser, pode ter outras telas diretas aqui depois */}
    </Drawer.Navigator>
  );
}
