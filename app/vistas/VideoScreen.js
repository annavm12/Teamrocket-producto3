/*import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Video from 'react-native-video';
import storage from '@react-native-firebase/storage';

const VideoPlayer = ({ videoPath }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: '100%', height: 200 });
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const storageRef = storage().ref(videoPath);
        const url = await storageRef.getDownloadURL();
        setVideoUrl(url);
      } catch (error) {
        console.error('Error al obtener la URL del video desde Firebase:', error);
      }
    };

    if (videoPath) {
      fetchVideoUrl();
    }
  }, [videoPath]);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopVideo = () => {
    videoRef.current.seek(0);
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const toggleVolume = () => {
    const newVolume = isMuted ? 1.0 : 0;
    videoRef.current.setVolume(newVolume);
    setVolume(newVolume);
    setIsMuted(!isMuted);
  };

  const increaseSize = () => {
    setVideoSize({ width: '100%', height: videoSize.height + 50 });
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoUrl }}
        style={[styles.video, videoSize]}
        controls={false}
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlayPause}>
          <Text>{isPlaying ? 'Pausar' : 'Reproducir'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={stopVideo}>
          <Text>Detener</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleVolume}>
          <Text>{isMuted ? 'Activar Volumen' : 'Desactivar Volumen'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={increaseSize}>
          <Text>Aumentar Tamaño</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    backgroundColor: 'black',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
});

export default VideoPlayer;*/

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Video from 'react-native-video';

const VideoScreen = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPauseVideo = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stopVideo = () => {
    videoRef.current.seek(0);
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const toggleFullScreen = () => {
    videoRef.current.presentFullscreenPlayer();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Video
        ref={videoRef}
        source={require('../assets/images/videoMadrid.mp4')} 
        style={{ width: '100%', height: '50%' }}
        resizeMode="contain"
        repeat
      />

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={playPauseVideo}>
          <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={stopVideo}>
          <Text>Stop</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={toggleFullScreen}>
          <Text>Toggle Full Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoScreen;
