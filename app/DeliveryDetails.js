import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Linking, Alert } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const DeliveryDetailsScreen = ({ route }) => {
  const { delivery } = route.params;
  const [status, setStatus] = useState('In corso');
  const [notes, setNotes] = useState('');
  const [images, setImages] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: delivery.location.latitude,
            longitude: delivery.location.longitude,
            current_weather: true
          }
        });
        setWeather(response.data.current_weather);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [delivery.location]);

  const handleStatusChange = () => {
    setStatus('Completato');
    Alert.alert('Stato aggiornato', 'La consegna è stata segnata come completata.');
  };

  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.assets) {
        setImages([...images, ...response.assets]);
      }
    });
  };

  const handleGetDirections = () => {
    const { latitude, longitude } = delivery.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={delivery.name} />
        <Card.Content>
          <Text style={styles.infoText}>Nome: {delivery.firstName}</Text>
          <Text style={styles.infoText}>Cognome: {delivery.lastName}</Text>
          <Text style={styles.infoText}>Città: {delivery.city}</Text>
          <Text style={styles.infoText}>Indirizzo: {delivery.address}</Text>
          <Text style={styles.infoText}>Telefono: {delivery.phone}</Text>
          <Text style={styles.infoText}>Stato: {status}</Text>
        </Card.Content>
      </Card>
      {delivery.location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: delivery.location.latitude,
            longitude: delivery.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={delivery.location} />
        </MapView>
      ) : (
        <Text style={styles.errorText}>Posizione non disponibile</Text>
      )}
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherTitle}>Meteo Attuale a {delivery.city}</Text>
        {weather ? (
          <View>
            <Text style={styles.weatherText}>Temperatura: {weather.temperature}°C</Text>
            <Text style={styles.weatherText}>Vento: {weather.windspeed} km/h</Text>
            <Text style={styles.weatherText}>Direzione del Vento: {weather.winddirection}°</Text>
          </View>
        ) : (
          <Text style={styles.weatherText}>Caricamento...</Text>
        )}
      </View>
      <Button 
        mode="contained" 
        icon="directions" 
        onPress={handleGetDirections} 
        style={styles.button}
      >
        Ottieni Indicazioni
      </Button>
      <Button 
        mode="contained" 
        icon="check" 
        onPress={handleStatusChange} 
        style={styles.button}
      >
        Segna come Completato
      </Button>
      <Button 
        mode="contained" 
        icon="camera" 
        onPress={handleImagePicker} 
        style={styles.button}
      >
        Carica Immagini e Note
      </Button>
      <TextInput
        label="Note"
        value={notes}
        onChangeText={setNotes}
        style={styles.input}
        multiline
      />
      {images.length > 0 && (
        <View style={styles.imagesContainer}>
          {images.map((image, index) => (
            <Image key={index} source={{ uri: image.uri }} style={styles.image} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    borderRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  map: {
    height: 200,
    marginVertical: 16,
  },
  weatherContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4, // Adds shadow on Android
    marginBottom: 16
  },
  weatherTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#c3262f'
  },
  weatherText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#c3262f'
  },
  button: {
    marginVertical: 8,
    backgroundColor: '#c3262f'
  },
  input: {
    marginTop: 16,
    marginBottom: 16,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 16,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default DeliveryDetailsScreen;
