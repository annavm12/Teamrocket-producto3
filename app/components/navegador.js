import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../vistas/HomeScreen';
import Screen2 from "../vistas/Screen2";

const Stack = createNativeStackNavigator();


const Navigation = () => {
    return (
      
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="prueba" component={Screen2}/>
        </Stack.Navigator>

    );
  };
  
  export default Navigation;