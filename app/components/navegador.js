import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../vistas/HomeScreen';
import Screen2 from '../vistas/Screen2';
import VideoPlayer from '../vistas/VideoScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="Video" component={VideoPlayer}/>
    </Stack.Navigator>
  );
};

export default Navigation;
