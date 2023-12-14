import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs } from "firebase/firestore";
import { db, app } from '../utils/Firebase';

import { useNavigation } from '@react-navigation/native';
import FlatListDias from '../components/flatList';
import Formulario from '../components/formulario';

const Homescreen = () => {

    const navigation = useNavigation();
    const [formularioVisible, setFormularioVisible] = useState(false);
    const handleCrearNuevoDia = () => {
        setFormularioVisible(true);
      };
    
      const handleCloseFormulario = () => {
        setFormularioVisible(false);
      };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "misviajes"));
        const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(fetchedData);
      } catch (error) {
        console.error('Error al obtener datos de Firebase:', error);
      }
    };
  
    fetchDataFromFirebase();
  }, []);

  return (
    <View style={styles.container}>
      {/* Sección del título */}
      <Text style={styles.title}>Mi Viaje por España</Text>
      <Image
        style={styles.image}
        source={require('../assets/images/logo.png')}
      />

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

      <TouchableOpacity style={styles.button} onPress={handleCrearNuevoDia}>
        <Text style={styles.buttonText}>Crear Nuevo Día</Text>
      </TouchableOpacity>

      <FlatListDias data={data}></FlatListDias>

      <Formulario visible={formularioVisible} onClose={handleCloseFormulario} />
        
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
  button: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default Homescreen;
