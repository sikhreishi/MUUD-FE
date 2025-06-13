import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useCreateJournalEntryMutation } from '../redux/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const moods = [1, 2, 3, 4, 5];
const MUUD_LOGO = require('../assets/muud_logo.png');

const JournalEntryScreen = ({ navigation, onSubmit = () => {} }) => { 
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState(null);
  const [error, setError] = useState('');
  const [createJournalEntry, { isLoading }] = useCreateJournalEntryMutation();

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
      await createJournalEntry({
        user_id,
        entry_text: entry,
        mood_rating: mood,
      }).unwrap();
      setEntry('');
      setMood(null);
      // Optionally show success or navigate
    } catch (err) {
      setError('Failed to submit entry.');
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
        <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('ContactManagement')}>
          <Text style={styles.contactButtonText}>Manage Contacts</Text>
        </TouchableOpacity>
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
});

export default JournalEntryScreen; 