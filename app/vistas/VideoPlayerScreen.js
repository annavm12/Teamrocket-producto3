import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';

const VideoPlayerScreen = ({ route }) => {
    const { videoURL } = route.params;
    const videoRef = useRef(null); // Referencia para controlar el video
    const [isPlaying, setIsPlaying] = useState(false); // Estado para el autoplay

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pauseAsync();
        } else {
            videoRef.current.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    // Estilos ajustados para evitar redundancia
    const videoWidth = Dimensions.get('window').width * 0.9; // 90% del ancho de la pantalla
    const videoHeight = videoWidth * (9 / 16); // Relación de aspecto de 16:9

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.video, { width: videoWidth, height: videoHeight }]} 
                onPress={handlePlayPause}
            >
                {isPlaying ? null : ( // Muestra el botón de play si el video no está reproduciéndose
                    <Image 
                        style={styles.playButton} 
                        source={require('../assets/icons/play-button.png')} // Asegúrate de que esta ruta sea correcta
                    />
                )}
                <Video
                    ref={videoRef}
                    style={StyleSheet.absoluteFill} // El video se expande para llenar el espacio de TouchableOpacity
                    source={{ uri: videoURL }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    shouldPlay={false} // No inicia el autoplay, se controla con el botón
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    video: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Esto asegura que nada se desborde del área del video
    },
    playButton: {
        width: 100,
        height: 100,
        zIndex: 10, // Asegura que el botón de play esté sobre el video
    },
});

export default VideoPlayerScreen;
