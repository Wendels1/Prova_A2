import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VeiculosScreen from '../Sreens/VeiculosScreen';
import ManutencoesScreen from '../Sreens/ManutencoesScreen';
import AbastecimentosScreen from '../Sreens/AbastecimentosScreen';
import DashboardScreen from '../Sreens/DashboardScreen';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Veículos" component={VeiculosScreen} />
      <Tab.Screen name="Manutenções" component={ManutencoesScreen} />
      <Tab.Screen name="Abastecimentos" component={AbastecimentosScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  );
}
