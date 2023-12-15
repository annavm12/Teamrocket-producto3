import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity, View } from 'react-native';

const sunIcon = require('../assets/icons/sun.png');
const moonIcon = require('../assets/icons/moon.png');
const trashIcon = require('../assets/icons/trash.png'); 

const Item = ({ id, city, dayNumber, resume, time, onPressItem, onDelete, onEdit }) => {
  const icon = time === 'Mañana' ? sunIcon : moonIcon;

  return (
    <View style={styles.item}>
        <TouchableOpacity onPress={() => onPressItem(id)} style={styles.itemContent}>
            <Text style={styles.city}>{city}</Text>
            <Text style={styles.dayNumber}>Día {dayNumber}</Text>
            <Text style={styles.resume}>{resume}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onEdit({ id, city, dayNumber, resume, time })} style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(id)} style={styles.deleteButton}>
            <Image source={trashIcon} style={styles.trashIcon} />
        </TouchableOpacity>
        <Image source={icon} style={styles.icon} />
    </View>
);
};

const FlatListDias = ({ data, onPressItem, onDeleteItem, onEditItem }) => {
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
                      onDelete={onDeleteItem}
                      onEdit={onEditItem} 
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
    backgroundColor: 'white', 
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
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
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashIcon: {
    width: 20,
    height: 20,
  },
});

export default FlatListDias;
