import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../utils/Firebase';
import { useNavigation } from '@react-navigation/native';
import FlatListDias from '../components/flatList';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('Todo');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDataFromFirebase = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "misviajes"));
                let fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Ordenar los datos por número de día de forma ascendente
                fetchedData.sort((a, b) => a.dayNumber - b.dayNumber);
                setData(fetchedData);
            } catch (error) {
                console.error('Error al obtener datos de Firebase:', error);
            }
        };

        fetchDataFromFirebase();
    }, []);

    const filteredData = data.filter(item =>
        (filter === 'Todo' || item.time === filter) &&
        item.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/logo.png')}
                />
                <Text style={styles.title}>Mi Viaje por España</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar por ciudad"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
            </View>

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={filter}
                    onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Todo el día" value="Todo" />
                    <Picker.Item label="Solo mañana" value="Mañana" />
                    <Picker.Item label="Solo tarde" value="Tarde" />
                </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NuevoDia')}>
                <Text style={styles.buttonText}>Crear Nuevo Día</Text>
            </TouchableOpacity>

            <FlatListDias
                data={filteredData}
                onPressItem={(itemId) => navigation.navigate('Screen2', { itemId })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    pickerContainer: {
        width: '50%',
        alignSelf: 'center',
    },
    picker: {
        width: '100%',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
