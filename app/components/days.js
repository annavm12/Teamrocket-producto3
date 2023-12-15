import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const Days = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((day, index) => (
        <Text key={index}>{day.title}</Text>
      ))}
    </View>
  );
};

export default Days;
