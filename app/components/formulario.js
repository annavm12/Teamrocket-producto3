import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity, Picker } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {bd, app } from '../utils/Firebase';

const Formulario = ({ visible, onClose }) => {
  const [city, setCity] = useState('');
  const [dayNumber, setDayNumber] = useState('');
  const [info, setInfo] = useState({ description: '', hotel: '', text: '', title: '', video: '', resume: '', time: 'Mañana' });

  const handleInputChange = (field, text) => {
    switch (field) {
      case 'city':
        setCity(text);
        break;
      case 'dayNumber':
        setDayNumber(text);
        break;
      case 'description':
      case 'hotel':
      case 'text':
      case 'title':
      case 'video':
      case 'resume':
      case 'time':
        setInfo((prevInfo) => ({ ...prevInfo, [field]: text }));
        break;
      default:
        break;
    }
  };
  
  const handleSubmit = async () => {
    try {
      // Guarda la información en Firestore
      await firestore().collection(bd).add({
        city,
        dayNumber: parseInt(dayNumber, 10),
        info,
      });
  
      // Muestra un mensaje de éxito
      Alert.alert('Formulario enviado', 'Información guardada en Firestore correctamente');
    } catch (error) {
      console.error('Error al guardar en Firestore:', error);
      // Muestra un mensaje de error
      Alert.alert('Error', 'No se pudo guardar la información en Firestore');
    }
  
    // Cierra el modal
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Crear Nuevo Día</Text>

          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            value={city}
            onChangeText={(text) => handleInputChange('city', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Número de día"
            value={dayNumber}
            onChangeText={(text) => handleInputChange('dayNumber', text)}
            keyboardType="numeric"
          />

          {/* Campos de info (map) */}
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={info.description}
            onChangeText={(text) => handleInputChange('description', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Hotel"
            value={info.hotel}
            onChangeText={(text) => handleInputChange('hotel', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Actividades"
            value={info.text}
            onChangeText={(text) => handleInputChange('text', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={info.title}
            onChangeText={(text) => handleInputChange('title', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Archivo"
            value={info.video}
            onChangeText={(text) => handleInputChange('video', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Resumen"
            value={info.resume}
            onChangeText={(text) => handleInputChange('resume', text)}
          />
          <Picker
            selectedValue={info.time}
            style={{ height: 40, width: '100%' }}
            onValueChange={(itemValue) => handleInputChange('time', itemValue)}
          >
            <Picker.Item label="Mañana" value="Mañana" />
            <Picker.Item label="Tarde" value="Tarde" />
          </Picker>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Crear</Text>
          </TouchableOpacity>
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Formulario;
