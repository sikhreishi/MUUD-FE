import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';

// Static contacts for demo
const initialContacts = [
  { id: 1, name: 'Alice Johnson', phone: '555-1234', relation: 'Friend' },
  { id: 2, name: 'Bob Smith', phone: '555-5678', relation: 'Family' },
  { id: 3, name: 'Carol Lee', phone: '555-8765', relation: 'Therapist' },
];

const ContactManagementScreen = () => {
  const [contacts, setContacts] = useState(initialContacts);

  const handleAddContact = (contact) => {
    setContacts([
      ...contacts,
      { ...contact, id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1 },
    ]);
  };

  return (
    <View style={styles.container}>
      <ContactForm onAdd={handleAddContact} />
      <Text style={styles.listTitle}>Current Contacts</Text>
      <FlatList
        data={contacts}
        renderItem={({ item }) => <ContactCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6fc',
    padding: 16,
    paddingTop: 32,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3d215b',
    marginBottom: 12,
    marginLeft: 4,
  },
});

export default ContactManagementScreen;