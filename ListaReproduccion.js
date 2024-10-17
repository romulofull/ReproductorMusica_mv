import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

const Canciones = [
  { titulo: "Cerveza", artista: "Ráfaga", src: require('./assets/Rafaga-Cerveza.mp3') },
  { titulo: "Mentirosa", artista: "Ráfaga", src: require('./assets/Rafaga-Mentirosa.mp3') },
  { titulo: "A Esa", artista: "Karina", src: require('./assets/Karina-A Esa.mp3') },
  { titulo: "No Somos", artista: "Christian Nodal", src: require('./assets/Christian Nodal-Ya No Somos Ni Seremos.mp3') },
  { titulo: "Otra noche", artista: "Los Angeles", src: require('./assets/Los Ángeles-Otra Noche.mp3') },
  { titulo: "Amapola", artista: "Papaya Dada", src: require('./assets/AMAPOLA-Papaya Dada.mp3') },
  { titulo: "Vida Pasada", artista: "Camilo", src: require('./assets/Camilo-Una Vida Pasada.mp3') },
];

const ListaReproduccion = () => {
  const [indiceCancionActual, setIndiceCancionActual] = useState(null);
  const [sound, setSound] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const reproducirCancion = async (indice) => {
    if (sound) {
      await sound.stopAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(Canciones[indice].src);
    setSound(newSound);
    await newSound.playAsync();
    setIndiceCancionActual(indice);
  };

  const pausarCancion = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
    setIndiceCancionActual(null);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reproductor MP3</Text>
      <TouchableOpacity style={styles.aboutButton} onPress={toggleModal}>
        <Text style={styles.aboutButtonText}>ACERCA DE</Text>
      </TouchableOpacity>

      <FlatList
        data={Canciones}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.songText}>{item.titulo} - {item.artista}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => reproducirCancion(index)}>
                <Icon name="play" size={20} color="#ff4081" />
              </TouchableOpacity>
              <View style={styles.spacing} />
              <TouchableOpacity onPress={pausarCancion}>
                <Icon name="pause" size={20} color="#ff4081" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {indiceCancionActual !== null && (
        <Text style={styles.nowPlaying}>
          Reproduciendo: {Canciones[indiceCancionActual].titulo} - {Canciones[indiceCancionActual].artista}
        </Text>
      )}

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Acerca de Nosotros</Text>
          <Image
            source={require('./assets/11.png')} 
            style={styles.image}
          />
          
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    flex: 1,
  },
  title: {
    color: '#09c9efd0',
    fontSize: 26,
    marginBottom: 20,
  },
  aboutButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    padding: 10,
  },
  aboutButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#1e1e1e',
    borderRadius: 7,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spacing: {
    width: 5,
  },
  songText: {
    color: '#ffffff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nowPlaying: {
    color: '#09c9efd0',
    marginTop: 20,
    fontSize: 18,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  image: {
    width: 100, 
    height: 100,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: '#ffffff',
  },
});

export default ListaReproduccion;
