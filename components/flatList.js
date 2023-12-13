import React from 'react';
import { FlatList, WebViewHTMLAttributes, TextareaHTMLAttributes, StyleSheet} from "react-native";

const flatList = ({ data, renderItem, keyExtractor }) => {
    return (
        <View style = {styles.container}>
            <FlatList
                data = {data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
  });

export default flatList;