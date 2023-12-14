import React from 'react';
import { ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';

const NuevoDiaScreen = () => {
  const onSubmit = (values) => {
    console.log(values);
    // Add logic to save the data here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Día</Text>
      <Formik
        initialValues={{ dayNumber: '', city: '', resume: '', time: 'Mañana' }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Número de día"
              keyboardType="numeric"
              onChangeText={handleChange('dayNumber')}
              onBlur={handleBlur('dayNumber')}
              value={values.dayNumber}
            />
            {/* Add more fields according to your needs */}

            <Text style={styles.heading}>Info</Text>
            {/* Add fields for the 'Info' section similarly */}

            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              Guardar día
            </Button>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default NuevoDiaScreen;