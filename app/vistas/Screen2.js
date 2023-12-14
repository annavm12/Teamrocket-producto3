import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Screen2 = () => {
  const navigation = useNavigation();

  const handleInfoButtonPress = () => {
    navigation.navigate('VideoPlayer');
  };

  return (
    <View>
      <Text>Hola, esta es la pantalla de inicio</Text>
      <Button
        title="Ir a otra pantalla"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      <TouchableOpacity style={styles.infoButton} onPress={handleInfoButtonPress}>
        <Text style={styles.infoButtonText}>Video</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  infoButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  infoButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Screen2;
