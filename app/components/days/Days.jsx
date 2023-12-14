import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { filterByCity, filterByTimeOfDay } from '../../utils/filterUtilities';

const DaysComponent = ({ days, selectedCity, selectedTime, onDaySelected, onDeleteDay }) => {
  const getCardColor = (index) => {
    const colors = ['#B3C2F2', '#FF8811', '#9DD9D2', '#FFF8F0', '#DAB6FC','#C3Eb78', '#D5C6E0', '#FE9920','#41EAD4','#6C91C2','#C3C9E9','#9FA0FF','#8895B3']; 
    return colors[index % colors.length];
  };

  const filteredDays = filterByTimeOfDay(filterByCity(days, selectedCity), selectedTime);

  return (
    <View style={styles.container}>
      {filteredDays.length > 0 ? (
        filteredDays.map((day, index) => (
          <View key={day.id} style={[styles.card, { backgroundColor: getCardColor(index) }]}>
            <Text style={styles.header}>Día {day.dayNumber}</Text>
            <View style={styles.body}>
              <Text style={styles.title}>{day.city}</Text>
              <Text>{day.resume}</Text>
              <Text>{day.time === 'Mañana' ? '🌞' : '🌜'}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => onDaySelected(day)} style={styles.infoButton}>
                <Text style={styles.infoText}>Info</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDeleteDay(day.id)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noDaysText}>No hay días disponibles. Por favor, agregue algunos.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  body: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  infoText: {
    color: '#fff',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
  },
  noDaysText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  // Añade aquí más estilos según sean necesarios
});

export default DaysComponent;
