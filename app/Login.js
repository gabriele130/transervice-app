import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const credentials = {
      username: 'User',
      password: 'Password'
    };

    if (username === credentials.username && password === credentials.password) {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.navigate('HomeTabs');
    } else {
      setError('Credenziali non valide');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#c3262f"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#c3262f"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
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
    backgroundColor: '#f5f5f5'
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#c3262f',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#c3262f'
  },
  button: {
    backgroundColor: '#c3262f',
  },
  errorText: {
    color: 'red',
    marginBottom: 16
  }
});

export default LoginScreen;
