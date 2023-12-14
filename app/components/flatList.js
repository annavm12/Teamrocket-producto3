import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';

const sunIcon = require('../assets/icons/sun.png');
const moonIcon = require('../assets/icons/moon.png');

const Item = ({ city, dayNumber, resume, time }) => {
  const icon = time === 'Mañana' ? sunIcon : moonIcon;

  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.dayNumber}>Día {dayNumber}</Text>
        <Text style={styles.resume}>{resume}</Text>
      </View>
      <Image source={icon} style={styles.icon} />
    </View>
  );
};

const FlatListDias = ({ data }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            city={item.city}
            dayNumber={item.dayNumber}
            resume={item.resume}
            time={item.time}
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
