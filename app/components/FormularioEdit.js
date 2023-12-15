import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../utils/Firebase';

const FormularioEdit = ({ visible, onClose, dayToEdit }) => {
  const [city, setCity] = useState('');
  const [dayNumber, setDayNumber] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoFileName, setVideoFileName] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [info, setInfo] = useState({ description: '', hotel: '', text: '', title: '', resume: '', time: 'Mañana' });

  useEffect(() => {
    if (dayToEdit && dayToEdit.info) {
      setCity(dayToEdit.city || '');
      setDayNumber(dayToEdit.dayNumber ? dayToEdit.dayNumber.toString() : '');
 
      const updatedInfo = {
        title: dayToEdit.info.title || 'Título por defecto',
        hotel: dayToEdit.info.hotel || 'Hotel por defecto',
        text: dayToEdit.info.text || 'Texto por defecto',
        description: dayToEdit.info.description || 'Descripción por defecto',
        video: dayToEdit.info.video || '', 

      };
  
      setInfo(updatedInfo);
  
      if (dayToEdit.info.video) {
        setVideoFile({ uri: dayToEdit.info.video });
        setVideoFileName("Video actual"); 
      } else {
        setVideoFile(null);
        setVideoFileName('');
      }
    } else {
      resetForm();
    }
  }, [dayToEdit]);
  

  const handleInputChange = (field, text) => {
    if (field === 'city') {
      setCity(text);
    } else if (field === 'dayNumber') {
      setDayNumber(text);
    } else {
      setInfo((prevInfo) => ({ ...prevInfo, [field]: text }));
    }
  };

  const selectVideo = () => {
    if (Platform.OS === 'web') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'video/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const source = { uri: URL.createObjectURL(file) };
          setVideoFile(source);
          setVideoFileName(file.name);
          setShowConfirmationModal(true);
        }
      };
      input.click();
    } else {
      const options = {
        mediaType: 'video',
        quality: 1,
      };

      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled video picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets[0]) {
          const source = { uri: response.assets[0].uri };
          setVideoFile(source);
          setVideoFileName(response.assets[0].fileName);
          setShowConfirmationModal(true);
        }
      });
    }
  };

  const uploadVideo = async () => {
    if (!videoFile || !videoFile.uri) {
      Alert.alert('Error', 'No video file selected');
      return null;
    }

    const uploadUri = videoFile.uri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const storageRef = ref(getStorage(), `videos/${filename}`);

    try {
      const response = await fetch(uploadUri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      if (!videoFile) {
        Alert.alert('Error', 'Por favor, selecciona un video primero.');
        return;
      }
  
      const videoUrl = await uploadVideo();
      if (!videoUrl) {
        Alert.alert('Error', 'No se pudo subir el video');
        return;
      }
  
      const dayData = {
        city,
        dayNumber: parseInt(dayNumber, 10),
        resume: info.resume,
        time: info.time,
        info: {
          title: info.title,
          hotel: info.hotel,
          text: info.text,
          description: info.description,
          video: videoUrl
        }
      };
  
      if (dayToEdit && dayToEdit.id) {
        const docRef = doc(db, "misviajes", dayToEdit.id);
        await updateDoc(docRef, dayData);
        setShowSuccessModal(true);
        reloadData();
      } else {
        console.error("No se proporcionó un ID válido para la edición");
      }
    } catch (error) {
      console.error('Error al actualizar en Firestore:', error);
      Alert.alert('Error', 'No se pudo actualizar la información en Firestore');
    }
  };

  const resetForm = () => {
    setCity('');
    setDayNumber('');
    setInfo({ description: '', hotel: '', text: '', title: '', resume: '', time: 'Mañana' });
    setVideoFile(null);
    setVideoFileName('');
    setShowConfirmationModal(false);
    setShowSuccessModal(false);
    onClose();
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Crear Nuevo Día</Text>

            <TextInput
              style={styles.input}
              placeholder="Ciudad"
              value={city}
              onChangeText={(text) => handleInputChange('city', text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Número de día"
              value={dayNumber}
              onChangeText={(text) => handleInputChange('dayNumber', text)}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={info.description}
              onChangeText={(text) => handleInputChange('description', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Hotel"
              value={info.hotel}
              onChangeText={(text) => handleInputChange('hotel', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Actividades"
              value={info.text}
              onChangeText={(text) => handleInputChange('text', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={info.title}
              onChangeText={(text) => handleInputChange('title', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Resumen"
              value={info.resume}
              onChangeText={(text) => handleInputChange('resume', text)}
            />

            <Picker
              selectedValue={info.time}
              style={styles.picker}
              onValueChange={(itemValue) => handleInputChange('time', itemValue)}
            >
              <Picker.Item label="Mañana" value="Mañana" />
              <Picker.Item label="Tarde" value="Tarde" />
            </Picker>

            <TouchableOpacity onPress={selectVideo} style={styles.button}>
              <Text style={styles.buttonText}>Seleccionar Video</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Crear</Text>
            </TouchableOpacity>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Video seleccionado: {videoFileName}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setShowConfirmationModal(false)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Día creado correctamente</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={resetForm}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  picker: {
    height: 40,
    width: "100%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
  },
});

export default FormularioEdit;
