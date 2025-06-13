import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useGetJournalEntriesQuery } from '../redux/apiSlice';

const JournalCard = ({ mood_rating, entry_text, timestamp }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.mood}>Mood: {mood_rating}</Text>
      <Text style={styles.date}>{new Date(timestamp).toLocaleDateString()}</Text>
    </View>
    <Text style={styles.entry}>{entry_text}</Text>
  </View>
);

const JournalHistoryScreen = () => {
  const userId = 1; // Replace with dynamic user id if available
  const { data, error, isLoading } = useGetJournalEntriesQuery(userId);

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

  const entries = data?.entries || [];

  if (!entries.length) {
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
        data={entries}
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