import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaCepsScreen from '../screens/ListaCepsScreen';
import SalvarCepScreen from '../screens/SalvarCepScreen';


// Cria o Stack Navigator para gerenciar as telas do aplicativo
// Ele permite a navegação entre telas de forma empilhada, onde cada nova tela é empilhada sobre a anterior
// Importa o createNativeStackNavigator do pacote @react-navigation/native-stack
const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
  // Define as rotas do Stack Navigator
  // Cada rota pode ter seu próprio componente e opções de título
    <Stack.Navigator>
      <Stack.Screen name="ListaCeps" component={ListaCepsScreen} options={{ title: 'Lista de CEPs' }} />
      <Stack.Screen name="SalvarCep" component={SalvarCepScreen} options={{ title: 'Salvar CEP' }} />
      <Stack.Screen name="EditarCep" component={SalvarCepScreen} options={{ title: 'Editar CEP' }} />
    </Stack.Navigator>
  );
}
