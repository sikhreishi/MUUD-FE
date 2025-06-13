import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store'; // Adjust path as needed
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen'; // Adjust path as needed
import JournalEntryScreen from './src/screens/JournalEntryScreen';
import JournalHistoryScreen from './src/screens/JournalHistoryScreen';
import ContactManagementScreen from './src/screens/ContactManagementScreen';
import { StatusBar, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="JournalEntry" component={JournalEntryScreen} />
          <Stack.Screen name="JournalHistory" component={JournalHistoryScreen} />
          <Stack.Screen name="ContactManagement" component={ContactManagementScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;