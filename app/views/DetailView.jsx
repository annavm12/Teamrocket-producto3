import React from 'react';
import { View, Text } from 'react-native';

const DetailView = ({ route }) => {
  // Obtener el ID pasado como parámetro
  const { id } = route.params;

  return (
    <View>
      <Text>Detalle para el ID: {id}</Text>
      {/* Resto de tu componente */}
    </View>
  );
};

export default DetailView;
