// app/CalendarScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const CalendarScreen = ({ navigation }) => {
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const storedDeliveries = await AsyncStorage.getItem('deliveries');
        if (storedDeliveries) {
          const parsedDeliveries = JSON.parse(storedDeliveries);
          const newMarkedDates = {};

          Object.keys(parsedDeliveries).forEach(date => {
            newMarkedDates[date] = {
              marked: true,
              dotColor: '#c3262f',
              activeOpacity: 0,
              customStyles: {
                container: {
                  backgroundColor: '#c3262f',
                  borderRadius: 8,
                },
                text: {
                  color: '#fff',
                  fontWeight: 'bold',
                },
              },
            };
          });

          setMarkedDates(newMarkedDates);
        }
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      }
    };

    fetchDeliveries();
  }, []);

  const onDayPress = (day) => {
    navigation.navigate('Deliveries', { selectedDate: day.dateString });
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        onDayPress={onDayPress}
        theme={{
          selectedDayBackgroundColor: '#c3262f',
          todayTextColor: '#c3262f',
          arrowColor: '#c3262f',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
});

export default CalendarScreen;
