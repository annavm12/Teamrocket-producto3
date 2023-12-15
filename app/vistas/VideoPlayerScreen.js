import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Video } from 'expo-av';

const VideoPlayerScreen = ({ route }) => {
    const { videoURL } = route.params;
    const videoRef = useRef(null); 
    const [isPlaying, setIsPlaying] = useState(false); 

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current.pauseAsync();
        } else {
            videoRef.current.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    const videoWidth = Dimensions.get('window').width * 0.9; 
    const videoHeight = videoWidth * (9 / 16); 

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.video, { width: videoWidth, height: videoHeight }]} 
                onPress={handlePlayPause}
            >
                {isPlaying ? null : ( 
                    <Image 
                        style={styles.playButton} 
                        source={require('../assets/icons/play-button.png')} 
                    />
                )}
                <Video
                    ref={videoRef}
                    style={StyleSheet.absoluteFill} 
                    source={{ uri: videoURL }}
                    useNativeControls
                    resizeMode="contain"
                    isLooping
                    shouldPlay={false} 
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
        overflow: 'hidden', 
    },
    playButton: {
        width: 100,
        height: 100,
        zIndex: 10, 
    },
});

export default VideoPlayerScreen;
