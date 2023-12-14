import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Button,
} from "react-native";

const sunIcon = require("../assets/icons/sun.png");
const moonIcon = require("../assets/icons/moon.png");

const Item = ({ city, dayNumber, resume, time }) => {
  const icon = time === "Mañana" ? sunIcon : moonIcon;

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

const FlatListDias = ({ data, onPressButton }) => {
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
        keyExtractor={(item) => item.id}
      />
      <Button title="INFO" onPress={onPressButton} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemContent: {
    flex: 1,
  },
  city: {
    fontSize: 16,
    fontWeight: "bold",
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
