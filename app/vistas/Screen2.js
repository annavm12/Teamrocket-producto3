import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/Firebase';

const Screen2 = ({ route, navigation }) => {
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

    const handleVideoPress = () => {
        navigation.navigate('VideoScreen', { videoUrl: dayDetail.video });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{dayDetail.title}</Text>
            <View style={styles.infoBox}>
                <Text style={styles.detailText}>Ciudad: {dayDetail.city}</Text>
                <Text style={styles.detailText}>Día Número: {dayDetail.dayNumber}</Text>
                <Text style={styles.detailText}>Descripción: {dayDetail.description}</Text>
                <Text style={styles.detailText}>Hotel: {dayDetail.hotel}</Text>
                <Text style={styles.detailText}>Actividades: {dayDetail.text}</Text>
                <Text style={styles.detailText}>Resumen: {dayDetail.resume}</Text>
                <Text style={styles.detailText}>Horario: {dayDetail.time}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Ver Video" onPress={handleVideoPress} color="#007bff" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    infoBox: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        marginBottom: 15,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        marginTop: 20,
        width: '60%',
        alignSelf: 'center',
    },
});

export default Screen2;
