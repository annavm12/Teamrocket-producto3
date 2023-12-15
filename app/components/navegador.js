import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../vistas/HomeScreen';
import Screen2 from '../vistas/Screen2';
import VideoPlayerScreen from '../vistas/VideoPlayerScreen';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ title: 'Inicio' }} 
            />
            <Stack.Screen 
                name="Screen2" 
                component={Screen2} 
                options={{ title: 'Detalles' }} 
            />
            <Stack.Screen 
                name="VideoPlayer" 
                component={VideoPlayerScreen} 
                options={{ title: 'Reproductor' }} 
            />
        </Stack.Navigator>
    );
};

export default Navigation;
