import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPageView from './app/views/MainPage';
import DetailView from './app/views/DetailView';
import { registerForPushNotificationsAsync } from './app/services/PushNotificationManager';

const Stack = createNativeStackNavigator();

// Configuración de enlaces profundos
const linking = {
  prefixes: ['mytravelapp://', 'https://mytravelapp.com'],
  config: {
    screens: {
      main: 'main', // Cambiado a 'main' para coincidir con Stack.Screen
      details: 'details', // Cambiado a 'details' para coincidir con Stack.Screen
    },
  },
};

const App = () => {
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => console.log("Push notification token:", token))
      .catch(err => console.error("Error al obtener el token de notificación push:", err));
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={MainPageView}
          options={{ title: 'Mi viaje por España' }}
        />
        <Stack.Screen
          name="details"
          component={DetailView}
          options={{ title: 'Detalles' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
