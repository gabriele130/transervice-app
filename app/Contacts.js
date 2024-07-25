import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contatti</Text>
      {/* Qui puoi aggiungere la logica per visualizzare i contatti */}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  }
});

export default ContactsScreen;
