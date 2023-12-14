import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const DayFormComponent = ({ onSubmit, initialDay }) => {
  const [day, setDay] = useState(initialDay || {
    dayNumber: '',
    city: '',
    resume: '',
    time: 'Mañana',
    info: {
      title: '',
      hotel: '',
      text: '',
      description: '',
      video: ''
    }
  });

  const handleInputChange = (name, value) => {
    setDay({ ...day, [name]: value });
  };

  const handleInfoChange = (name, value) => {
    setDay({ ...day, info: { ...day.info, [name]: value } });
  };

  const handleSubmit = () => {
    if (day.dayNumber && day.city) {
      onSubmit(day);
    } else {
      alert('Por favor, llene al menos el número de día y la ciudad.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Número de día:</Text>
      <TextInput
        value={day.dayNumber.toString()}
        onChangeText={(text) => handleInputChange('dayNumber', parseInt(text))}
        keyboardType="numeric"
        style={styles.input}
      />
      {/* Repetir para otros campos como ciudad, resumen, etc. */}
      {/* ... */}
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Guardar día</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Añade aquí más estilos según sean necesarios
});

export default DayFormComponent;
