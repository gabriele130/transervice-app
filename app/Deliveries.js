import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const DeliveriesScreen = ({ navigation }) => {
  const [deliveries, setDeliveries] = useState({});
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const storedDeliveries = await AsyncStorage.getItem('deliveries');
        if (storedDeliveries) {
          const parsedDeliveries = JSON.parse(storedDeliveries);
          setDeliveries(parsedDeliveries);
        } else {
          setDeliveries({});
        }
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        setDeliveries({});
      }
    };

    fetchDeliveries();
  }, []);

  const handlePrevDay = () => {
    setCurrentDate(prevDate => moment(prevDate).subtract(1, 'days').format('YYYY-MM-DD'));
  };

  const handleNextDay = () => {
    setCurrentDate(prevDate => moment(prevDate).add(1, 'days').format('YYYY-MM-DD'));
  };

  const deliveriesForCurrentDate = deliveries[currentDate] || [];

  return (
    <View style={styles.container}>
      <View style={styles.dateNavigation}>
        <TouchableOpacity onPress={handlePrevDay}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.dateText}>{moment(currentDate).format('DD MMM YYYY')}</Text>
        <TouchableOpacity onPress={handleNextDay}>
          <Ionicons name="arrow-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.deliveriesContainer}>
        {deliveriesForCurrentDate.length === 0 ? (
          <Text style={styles.noDeliveries}>Non ci sono consegne</Text>
        ) : (
          deliveriesForCurrentDate.map((delivery, index) => (
            <Card key={index} style={styles.card}>
              <Card.Title title={delivery.name} titleStyle={styles.cardTitle} />
              <Card.Content>
                <Text style={styles.cardContent}>Nome: {delivery.firstName} {delivery.lastName}</Text>
                <Text style={styles.cardContent}>Indirizzo: {delivery.address}</Text>
                <Text style={styles.cardContent}>Città: {delivery.city}</Text>
                <Text style={styles.cardContent}>Data: {delivery.date}</Text>
              </Card.Content>
              <Card.Actions>
                <Button 
                  mode="contained" 
                  onPress={() => navigation.navigate('DeliveryDetails', { delivery })} 
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                >
                  Visualizza Dettagli
                </Button>
              </Card.Actions>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  dateNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  deliveriesContainer: {
    flexGrow: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  noDeliveries: {
    fontSize: 16,
    color: '#000',
  },
  card: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    color: '#000',
  },
  cardContent: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#c3262f',
  },
  buttonLabel: {
    color: '#fff',
  },
});

export default DeliveriesScreen;
