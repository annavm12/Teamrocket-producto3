import React from 'react';
import { View, Text, Button } from 'react-native';

const Screen2 = ({ navigation }) => {
  return (
    <View>
      <Text>Hola, esta es la pantalla de inicio</Text>
      <Button
        title="Ir a otra pantalla"
        onPress={() => navigation.navigate('OtraPantalla')}
      />
    </View>
  );
};

export default Screen2;
