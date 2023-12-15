import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/Firebase';
import { useNavigation } from '@react-navigation/native';

const Screen2 = ({ route }) => {
    const navigation = useNavigation();
    const [dayDetail, setDayDetail] = useState(null);
    const { itemId } = route.params;

    useEffect(() => {
        const loadDayDetails = async () => {
            const docRef = doc(db, "misviajes", itemId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDayDetail(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };

        loadDayDetails();
    }, [itemId]);

    if (!dayDetail) {
        return <Text style={styles.loadingText}>Cargando...</Text>;
    }

    const { info } = dayDetail;

    const handleViewVideo = () => {
        navigation.navigate('VideoPlayer', { videoURL: info?.video });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.header}>{info?.title || 'Título no disponible'}</Text>
                <Text style={styles.label}>Ciudad:</Text>
                <Text style={styles.value}>{dayDetail.city}</Text>
                <Text style={styles.label}>Día Número:</Text>
                <Text style={styles.value}>{dayDetail.dayNumber}</Text>
                <Text style={styles.label}>Descripción:</Text>
                <Text style={styles.value}>{info?.description || 'Descripción no disponible'}</Text>
                <Text style={styles.label}>Hotel:</Text>
                <Text style={styles.value}>{info?.hotel || 'Hotel no disponible'}</Text>
                <Text style={styles.label}>Actividades:</Text>
                <Text style={styles.value}>{info?.text || 'Actividades no disponibles'}</Text>
                <Text style={styles.label}>Resumen:</Text>
                <Text style={styles.value}>{dayDetail.resume}</Text>
                <Text style={styles.label}>Horario:</Text>
                <Text style={styles.value}>{dayDetail.time}</Text>

                <Button title="Ver Video" onPress={handleViewVideo} color="#007bff" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    header: {
        fontSize: 22,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#555',
        fontWeight: 'bold',
        marginTop: 8,
    },
    value: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Screen2;
