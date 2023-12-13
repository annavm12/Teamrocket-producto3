import React from 'react';
import { View, Text, Picker, TextInput, StyleSheet, Image } from 'react-native';


const Home = () => {
  return (
    <View style={styles.container}>
      {/* Sección del título */}
      <Text style={styles.title}>Mi Viaje por España</Text>
      <Image
        style={styles.image}
        source={require('../assets/images/logo.png')}
        
      />

      {/* Contenedor del buscador */}
      <View style={styles.searchContainer}>
        <Text>Buscar: </Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe aquí"
        />
        <Picker>
          <Picker.Item label="Opción 1" value="opcion1" />
          <Picker.Item label="Opción 2" value="opcion2" />
          <Picker.Item label="Opción 3" value="opcion3" />
        </Picker>
      </View>

      <View style={styles.flatListContainer}>
        {/* Implementa tu FlatList aquí */}
        <Text>FlatList Infinita</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,  
    height: 100, 
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  flatListContainer: {
    marginTop: 20,
  },
});

export default Home;
