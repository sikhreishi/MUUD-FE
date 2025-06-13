import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactCard = ({ name, phone, relation }) => (
  <View style={styles.card}>
    <Text style={styles.contactName}>{name}</Text>
    <Text style={styles.contactDetail}>Phone: {phone}</Text>
    <Text style={styles.contactDetail}>Relation: {relation}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#3d215b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  contactName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3d215b',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 15,
    color: '#555',
    marginBottom: 2,
  },
});

export default ContactCard; 