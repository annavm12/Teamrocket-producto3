import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DaysComponent from '../components/days/Days';
import SearchComponent from '../components/search/Search';
import DayFormComponent from '../components/days/DayFormComponent';
import { DataContext } from '../services/DataContext';

const MainPageView = () => {
  const { days, loading, addDay, updateDay, deleteDay } = useContext(DataContext);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTime, setSelectedTime] = useState('TodoElDia');

  const handleDaySelect = day => {
    setSelectedDay(day);
    setShowForm(true);
    setIsEditing(true);
  };

  const handleDayDelete = async dayId => {
    await deleteDay(dayId);
  };

  const toggleForm = () => {
    if (isEditing) {
      setSelectedDay(null);
      setIsEditing(false);
    }
    setShowForm(!showForm);
  };

  const handleFormSubmit = async (newDay) => {
    if (isEditing) {
      await updateDay(selectedDay.id, newDay);
    } else {
      await addDay(newDay);
    }
    setShowForm(false);
    setIsEditing(false);
    setSelectedDay(null);
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <SearchComponent
        onCitySearch={setSearchQuery}
        onTimeSearch={setSelectedTime}
      />
      <DaysComponent
        days={days}
        selectedCity={searchQuery}
        selectedTime={selectedTime}
        onDaySelected={handleDaySelect}
        onDeleteDay={handleDayDelete}
      />
      {showForm && (
        < DayFormComponent onSubmit={handleFormSubmit} initialDay={selectedDay} />
      )}
      <TouchableOpacity onPress={toggleForm} style={styles.button}>
        <Text>{isEditing ? 'Editar Día' : 'Agregar Día'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  // Añade aquí más estilos según sean necesarios
});

export default MainPageView;