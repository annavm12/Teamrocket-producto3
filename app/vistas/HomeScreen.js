import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../utils/Firebase';
import { useNavigation } from '@react-navigation/native';
import FlatListDias from '../components/flatList';
import Formulario from '../components/formulario';
import FormularioEdit from '../components/FormularioEdit';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('Todo');
    const [searchQuery, setSearchQuery] = useState('');
    const [formularioVisible, setFormularioVisible] = useState(false);
    const [refreshCounter, setRefreshCounter] = useState(0);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [dayToDelete, setDayToDelete] = useState(null);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [dayToEdit, setDayToEdit] = useState(null);

    useEffect(() => {
        const fetchDataFromFirebase = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "misviajes"));
                let fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                fetchedData.sort((a, b) => a.dayNumber - b.dayNumber);
                console.log("Datos recuperados:", fetchedData); 
                setData(fetchedData);
            } catch (error) {
                console.error('Error al obtener datos de Firebase:', error);
            }
        };
        fetchDataFromFirebase();
    }, [refreshCounter]);

    const handleCrearNuevoDia = () => {
        setFormularioVisible(true);
    };

    const handleCloseFormulario = () => {
        setFormularioVisible(false);
        setRefreshCounter(prev => prev + 1);
    };

    const handleEditDay = (day) => {
        if (day && day.info) {
          setDayToEdit(day);
          setEditFormVisible(true);
        } else {
          console.error("Datos del día incompletos o incorrectos", day);
        }
      };      
    
    const handleCloseEditForm = () => {
        setEditFormVisible(false);
        setRefreshCounter(prev => prev + 1);
    };

    const handleDeleteDay = (id) => {
        setDayToDelete(id);
        setIsConfirmModalVisible(true);
    };

    const confirmDeletion = async () => {
        if (dayToDelete) {
            try {
                await deleteDoc(doc(db, "misviajes", dayToDelete));
                setRefreshCounter(prev => prev + 1);
            } catch (error) {
                console.error('Error al eliminar el día:', error);
            }
        }
        setIsConfirmModalVisible(false);
        setDayToDelete(null);
    };

    const cancelDeletion = () => {
        setIsConfirmModalVisible(false);
        setDayToDelete(null);
    };

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
                    onValueChange={(itemValue) => setFilter(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Todo el día" value="Todo" />
                    <Picker.Item label="Solo mañana" value="Mañana" />
                    <Picker.Item label="Solo tarde" value="Tarde" />
                </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleCrearNuevoDia}>
                <Text style={styles.buttonText}>Crear Nuevo Día</Text>
            </TouchableOpacity>

            <FlatListDias
                data={filteredData}
                onPressItem={(itemId) => navigation.navigate('Screen2', { itemId })}
                onDeleteItem={handleDeleteDay}
                onEditItem={handleEditDay}
            />
            <FormularioEdit
                visible={editFormVisible}
                onClose={handleCloseEditForm}
                dayToEdit={dayToEdit}
            />

            <Formulario visible={formularioVisible} onClose={handleCloseFormulario} />

            <Modal
                visible={isConfirmModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsConfirmModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>¿Estás seguro de que deseas eliminar este día?</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={[styles.button, styles.deleteModalButton]} onPress={confirmDeletion}>
                                <Text style={styles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.cancelModalButton]} onPress={cancelDeletion}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    deleteModalButton: {
        backgroundColor: 'red',
    },
    cancelModalButton: {
        backgroundColor: 'gray',
    },
});

export default HomeScreen;
