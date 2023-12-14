import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Detail = ({ info, onClose, onEdit }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{info.title}</Text>
            <Text>Actividades: {info.text}</Text>
            <Text>Alojamiento: {info.hotel}</Text>
            <Text>Descripción: {info.description}</Text>
            {info.video && <Text>Video: {info.video}</Text>}

            <View style={styles.buttons}>
                <TouchableOpacity onPress={onEdit} style={styles.buttonEdit}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={styles.buttonClose}>
                    <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        margin: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    buttonEdit: {
        backgroundColor: '#f0ad4e',
        padding: 10,
        borderRadius: 5,
    },
    buttonClose: {
        backgroundColor: '#d9534f',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    // Añade aquí más estilos según sean necesarios
});

export default Detail;
