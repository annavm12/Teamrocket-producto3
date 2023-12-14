import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';

const sunIcon = require('../assets/icons/sun.png');
const moonIcon = require('../assets/icons/moon.png');

const Item = ({ id, city, dayNumber, resume, time, onPressItem }) => {
  const icon = time === 'Mañana' ? sunIcon : moonIcon;

  return (
    <TouchableOpacity style={styles.item} onPress={() => onPressItem(id)}>
      <View style={styles.itemContent}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.dayNumber}>Día {dayNumber}</Text>
        <Text style={styles.resume}>{resume}</Text>
      </View>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

const FlatListDias = ({ data, onPressItem }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            city={item.city}
            dayNumber={item.dayNumber}
            resume={item.resume}
            time={item.time}
            onPressItem={onPressItem}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'white', // Fondo blanco
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10, // Bordes redondeados

    // Sombreado para efecto de flotación
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContent: {
    flex: 1,
  },
  infoButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  infoButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  city: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dayNumber: {
    fontSize: 14,
  },
  resume: {
    fontSize: 12,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default FlatListDias;
