import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Modal } from 'react-native';
import { useCreateJournalEntryMutation, useAddContactMutation } from '../redux/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const moods = [1, 2, 3, 4, 5];
const MUUD_LOGO = require('../assets/muud_logo.png');

const JournalEntryScreen = ({ navigation, onSubmit = () => {} }) => { 
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState(null);
  const [error, setError] = useState('');
  const [createJournalEntry, { isLoading }] = useCreateJournalEntryMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [addContact, { isLoading: isAddingContact }] = useAddContactMutation();
  const [contactError, setContactError] = useState('');

  // For now, use user_id 1 and the provided token
  const user_id = 1;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6Im5ld3VzZXIiLCJpYXQiOjE3NDk4NDMzODUsImV4cCI6MTc0OTkyOTc4NX0.h2MJ0ajwRh9IcVBWC93OA7NlkMQGsqav9xR3xzVdpUk';

  const handleSubmit = async () => {
    if (!entry.trim() || !mood) {
      setError('Please enter your journal entry and select a mood.');
      return;
    }
    setError('');
    try {
      // Save token for future use (simulate login)
      await AsyncStorage.setItem('token', token);
      const response = await createJournalEntry({
        user_id,
        entry_text: entry,
        mood_rating: mood,
      }).unwrap();
      setEntry('');
      setMood(null);
      // Show success popup
      Alert.alert('Success', response.message || 'Journal entry created successfully');
    } catch (err) {
      setError('Failed to submit entry.');
    }
  };
  
  const handleAddContact = async () => {
    if (!contactName.trim() || !contactEmail.trim()) {
      setContactError('Please enter a name and email.');
      return;
    }
    setContactError('');
    try {
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setContactError('Authentication required. Please login again.');
        return;
      }

      // Ensure user_id is a number
      const userId = parseInt(user_id, 10);
      
      console.log('Attempting to add contact with data:', {
        user_id: userId,
        contact_name: contactName,
        contact_email: contactEmail,
        token: token ? 'present' : 'missing'
      });
      
      const response = await addContact({ 
        user_id: userId, 
        contact_name: contactName, 
        contact_email: contactEmail 
      }).unwrap();
      
      console.log('Contact addition response:', response);
      
      setContactName('');
      setContactEmail('');
      setModalVisible(false);
      Alert.alert('Success', 'Contact added successfully');
    } catch (err) {
      console.error('Error adding contact:', err);
      console.error('Error details:', {
        message: err?.data?.error,
        status: err?.status,
        data: err?.data
      });
      setContactError(err?.data?.error || 'Failed to add contact.');
    }
  };

  const goToHistory = () => {
    navigation.navigate('JournalHistory');
  };

  return (
    <View style={styles.container}>
      <Image source={MUUD_LOGO} style={styles.logo} />
      <View style={styles.contentBox}>
        <Text style={styles.label}>How are you feeling today?</Text>
        <View style={styles.moodContainer}>
          {moods.map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.moodButton, mood === m && styles.moodButtonSelected]}
              onPress={() => setMood(m)}
            >
              <Text style={[styles.moodText, mood === m && styles.moodTextSelected]}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Write your journal entry..."
          value={entry}
          onChangeText={setEntry}
          multiline
          numberOfLines={4}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isLoading}>
          <Text style={styles.submitButtonText}>{isLoading ? 'Submitting...' : 'Submit'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.historyButton} onPress={goToHistory}>
          <Text style={styles.historyButtonText}>View Journal History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.contactButtonText}>Add Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('ContactManagement')}>
          <Text style={styles.contactButtonText}>Manage Contacts</Text>
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Contact</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Contact Name</Text>
                <TextInput
                  style={[styles.input, styles.modalInput]}
                  placeholder="Enter contact name"
                  value={contactName}
                  onChangeText={setContactName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Contact Email</Text>
                <TextInput
                  style={[styles.input, styles.modalInput]}
                  placeholder="Enter contact email"
                  value={contactEmail}
                  onChangeText={setContactEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {contactError ? <Text style={styles.error}>{contactError}</Text> : null}
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.submitButton, { flex: 1, marginRight: 8 }]} 
                  onPress={handleAddContact} 
                  disabled={isAddingContact}
                >
                  <Text style={styles.submitButtonText}>
                    {isAddingContact ? 'Adding...' : 'Submit'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.historyButton, { flex: 1, marginLeft: 8 }]} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.historyButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 40,
    marginBottom: 16,
  },
  contentBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#f8f6fc',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#3d215b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#3d215b',
    alignSelf: 'flex-start',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    width: '100%',
  },
  moodButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    backgroundColor: '#f5f5f5',
  },
  moodButtonSelected: {
    backgroundColor: '#3d215b',
    borderColor: '#3d215b',
  },
  moodText: {
    fontSize: 16,
    color: '#333',
  },
  moodTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
    fontSize: 16,
    width: '100%',
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  submitButton: {
    backgroundColor: '#3d215b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  historyButtonText: {
    color: '#3d215b',
    fontSize: 16,
    fontWeight: '600',
  },
  contactButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  contactButtonText: {
    color: '#3d215b',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#3d215b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3d215b',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3d215b',
    marginBottom: 8,
  },
  modalInput: {
    height: 45,
    minHeight: 45,
    marginBottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    textAlignVertical: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
});

export default JournalEntryScreen; 