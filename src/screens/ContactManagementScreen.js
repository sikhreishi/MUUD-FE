import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import { useGetContactsQuery } from '../redux/apiSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ContactManagementScreen = () => {
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const storedUserId = await AsyncStorage.getItem('user_id');
      setUserId(storedUserId ? parseInt(storedUserId, 10) : null);
    })();
  }, []);

  const { data, isLoading, error, refetch } = useGetContactsQuery(userId, { skip: !userId });
  const contacts = data?.contacts || [];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (userId) refetch();
    });
    return unsubscribe;
  }, [navigation, userId]);

  // Debug logs
  console.log('ContactManagementScreen userId:', userId);
  console.log('Contacts loading:', isLoading);
  console.log('Contacts error:', error);
  console.log('Contacts data:', data);

  return (
    <View style={styles.container}>
      <ContactForm onAdd={refetch} />
      <Text style={styles.listTitle}>Current Contacts</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={{ color: 'red' }}>Failed to load contacts</Text>
      ) : (
        <FlatList
          data={contacts}
          renderItem={({ item }) => <ContactCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      )}
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