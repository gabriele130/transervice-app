import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ route }) => {
  const { team } = route.params || {};
  const [deliveries, setDeliveries] = useState([]);
  const [completedDeliveries, setCompletedDeliveries] = useState(0);
  const [pendingDeliveries, setPendingDeliveries] = useState(0);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      const storedDeliveries = await AsyncStorage.getItem('deliveries');
      if (storedDeliveries) {
        const parsedDeliveries = JSON.parse(storedDeliveries);
        setDeliveries(parsedDeliveries);
      }
    };

    fetchDeliveries();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayDeliveries = Object.values(deliveries).flat().filter(delivery => delivery.date === today && delivery.team === team);
    const completed = todayDeliveries.filter(delivery => delivery.status === 'completed').length;
    const pending = todayDeliveries.filter(delivery => delivery.status === 'pending').length;
    setCompletedDeliveries(completed);
    setPendingDeliveries(pending);
  }, [deliveries, team]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: 36.7318, // Pozzallo, Italia
            longitude: 14.8495,
            current_weather: true
          }
        });
        setWeather(response.data.current_weather);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.greeting}>Benvenuto, {team}!</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Statistiche di Oggi</Text>
        <Text style={styles.infoText}>Consegne Completate: {completedDeliveries}</Text>
        <Text style={styles.infoText}>Consegne Pendenti: {pendingDeliveries}</Text>
      </View>
      <View style={styles.weatherContainer}>
        <Text style={styles.weatherTitle}>Meteo Attuale a Pozzallo</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center'
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16
  },
  logo: {
    width: 150,
    height: 150,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  infoContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4, // Adds shadow on Android
    marginBottom: 16
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center'
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
    textAlign: 'center'
  },
  weatherText: {
    fontSize: 16,
    textAlign: 'center'
  },
});

export default HomeScreen;
