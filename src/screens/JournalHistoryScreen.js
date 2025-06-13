import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
// import { useGetJournalEntriesQuery } from '../services/apiSlice';

const staticData = [
  { id: 1, mood: 5, entry: 'Had a fantastic day at the park with friends!', created_at: '2024-06-14T10:00:00Z' },
  { id: 2, mood: 3, entry: 'Work was a bit stressful, but I managed.', created_at: '2024-06-13T09:30:00Z' },
  { id: 3, mood: 4, entry: 'Enjoyed a good book and some quiet time.', created_at: '2024-06-12T20:15:00Z' },
  { id: 4, mood: 2, entry: 'Felt a bit under the weather today.', created_at: '2024-06-11T14:45:00Z' },
  { id: 5, mood: 5, entry: 'Accomplished a lot! Very productive.', created_at: '2024-06-10T18:00:00Z' },
  { id: 6, mood: 1, entry: 'Tough day, but tomorrow is a new start.', created_at: '2024-06-09T21:00:00Z' },
  { id: 7, mood: 4, entry: 'Had a great workout and healthy meal.', created_at: '2024-06-08T07:30:00Z' },
  { id: 8, mood: 3, entry: 'Watched a movie and relaxed.', created_at: '2024-06-07T22:00:00Z' },
];

const JournalCard = ({ mood, entry, created_at }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.mood}>Mood: {mood}</Text>
      <Text style={styles.date}>{new Date(created_at).toLocaleDateString()}</Text>
    </View>
    <Text style={styles.entry}>{entry}</Text>
  </View>
);

const JournalHistoryScreen = () => {
  // const { data, error, isLoading } = useGetJournalEntriesQuery();
  const data = staticData;
  const isLoading = false;
  const error = false;

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3d215b" />
        <Text style={styles.loadingText}>Loading your journal entries...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load entries. Please try again later.</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No journal entries yet. Start writing your thoughts!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal History</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <JournalCard {...item} />}
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
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3d215b',
    marginBottom: 24,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#3d215b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  mood: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c47a6',
  },
  date: {
    fontSize: 14,
    color: '#aaa',
  },
  entry: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
    lineHeight: 22,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    color: '#3d215b',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: '#6c47a6',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default JournalHistoryScreen; 