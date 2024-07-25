import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TeamSelectionScreen = ({ navigation }) => {
  const handleTeamSelection = async (team) => {
    await AsyncStorage.setItem('team', team);
    console.log('Team selected:', team); // Debug: verifica la selezione del team
    navigation.navigate('HomeTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleziona il tuo team</Text>
      <Button
        mode="contained"
        onPress={() => handleTeamSelection('Team A')}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Team A
      </Button>
      <Button
        mode="contained"
        onPress={() => handleTeamSelection('Team B')}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Team B
      </Button>
      <Button
        mode="contained"
        onPress={() => handleTeamSelection('Team C')}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Team C
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#c3262f',
    marginVertical: 8,
    width: '80%'
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TeamSelectionScreen;
