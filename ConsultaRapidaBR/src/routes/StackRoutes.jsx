import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaCepsScreen from '../screens/ListaCepsScreen';
import SalvarCepScreen from '../screens/SalvarCepScreen';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaCeps" component={ListaCepsScreen} options={{ title: 'Lista de CEPs' }} />
      <Stack.Screen name="SalvarCep" component={SalvarCepScreen} options={{ title: 'Salvar CEP' }} />
      <Stack.Screen name="EditarCep" component={SalvarCepScreen} options={{ title: 'Editar CEP' }} />
    </Stack.Navigator>
  );
}
