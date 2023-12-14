import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const sunIcon = require('../assets/icons/sun.png');
const moonIcon = require('../assets/icons/moon.png');

const Item = ({ city, dayNumber, resume, time }) => {
  const icon = time === 'Mañana' ? sunIcon : moonIcon;
  const navigation = useNavigation();

  const handleInfoButtonPress = () => {
    // Navegar a la pantalla Screen2
    navigation.navigate('Screen2');
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.dayNumber}>Día {dayNumber}</Text>
        <Text style={styles.resume}>{resume}</Text>
      </View>
      <TouchableOpacity style={styles.infoButton} onPress={handleInfoButtonPress}>
        <Text style={styles.infoButtonText}>Info</Text>
      </TouchableOpacity>
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
