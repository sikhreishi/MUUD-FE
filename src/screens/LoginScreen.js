import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLoginMutation } from '../redux/apiSlice';
import MuudInput from '../components/MuudInput';
import MuudButton from '../components/MuudButton';
import SocialLoginButtons from '../components/SocialLoginButtons';
import { theme } from '../theme/theme';

const MUUD_LOGO = require('../assets/muud_logo.png'); // Replace with your actual logo path

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const result = await login({ username, password }).unwrap();
      // Save token to storage if needed
      navigation.navigate('JournalEntry');
      console.log('Login successful:', result);
    } catch (err) {
      // Error handled below
      console.log('Login failed:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={MUUD_LOGO} style={styles.logo} />
      <Text style={styles.label}>Username</Text>
      <MuudInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <MuudInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={!showPassword}
        showToggle={true}
        onToggleShow={() => setShowPassword(!showPassword)}
      />
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot username or password?</Text>
      </TouchableOpacity>
      {error && <Text style={styles.error}>{error.data?.error || 'Login failed'}</Text>}
      <MuudButton title={isLoading ? 'Logging in...' : 'Log in'} onPress={handleLogin} disabled={isLoading} />
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>
      <SocialLoginButtons onGoogle={() => {}} onApple={() => {}} onFacebook={() => {}} />
      <MuudButton title="Join MUUD Today" variant="secondary" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.secondary, padding: 24, justifyContent: 'center' },
  logo: { width: 120, height: 120, alignSelf: 'center', marginBottom: 32, resizeMode: 'contain' },
  label: { fontWeight: 'bold', marginBottom: 4, marginTop: 12, color: theme.colors.text },
  forgot: { color: "#3d215b", marginBottom: 16, marginTop: 4,  },
  error: { color: theme.colors.error, marginBottom: 8 },
  orContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  line: { flex: 1, height: 1, backgroundColor: theme.colors.border },
  orText: { marginHorizontal: 8, color: theme.colors.muted },
});

export default LoginScreen; 