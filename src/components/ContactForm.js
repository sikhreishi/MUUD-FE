import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ContactForm = ({ onAdd }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!contactName.trim() || !contactEmail.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    try {
      const result = await onAdd({ contact_name: contactName, contact_email: contactEmail });
      if (result && result.success) {
        Alert.alert('Success', 'Contact added successfully');
        setContactName('');
        setContactEmail('');
      } else {
        Alert.alert('Error', result?.error || 'Failed to add contact');
      }
    } catch (err) {
      Alert.alert('Error', err?.message || 'Failed to add contact');
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Add New Contact</Text>
      <Text style={styles.inputLabel}>Contact Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter contact name"
        value={contactName}
        onChangeText={setContactName}
      />
      <Text style={styles.inputLabel}>Contact Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter contact email"
        value={contactEmail}
        onChangeText={setContactEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#3d215b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3d215b',
    marginBottom: 12,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    backgroundColor: '#3d215b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
    width: '100%',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3d215b',
    marginBottom: 4,
    marginLeft: 2,
  },
});

export default ContactForm; 