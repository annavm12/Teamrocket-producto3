import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Search = ({ onCitySearch, onTimeSearch }) => {
    const [query, setQuery] = useState('');
    const [selectedTime, setSelectedTime] = useState('TodoElDia');

    const handleSearch = () => {
        onCitySearch(query);
        onTimeSearch(selectedTime);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar por ciudad"
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.button}>
                <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>

            <View style={styles.timeSelector}>
                <TouchableOpacity 
                    onPress={() => setSelectedTime('TodoElDia')}
                    style={[styles.timeButton, selectedTime === 'TodoElDia' && styles.timeButtonSelected]}
                >
                    <Text style={styles.timeButtonText}>Todo el día</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setSelectedTime('Mañana')}
                    style={[styles.timeButton, selectedTime === 'Mañana' && styles.timeButtonSelected]}
                >
                    <Text style={styles.timeButtonText}>Mañana 🌞</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setSelectedTime('Tarde')}
                    style={[styles.timeButton, selectedTime === 'Tarde' && styles.timeButtonSelected]}
                >
                    <Text style={styles.timeButtonText}>Tarde 🌜</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    timeSelector: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
    },
    timeButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#e7e7e7',
    },
    timeButtonSelected: {
        backgroundColor: '#007bff',
    },
    timeButtonText: {
        color: '#000',
    },
    // Añade aquí más estilos según sean necesarios
});

export default Search;
