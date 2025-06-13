import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const googleIcon = require('../assets/icons8-google-48.png');
const appleIcon = require('../assets/icons8-apple-50.png');
const facebookIcon = require('../assets/icons8-facebook-48.png');

const SocialLoginButtons = ({
  onGoogle = () => {},
  onApple = () => {},
  onFacebook = () => {},
}) => (
  <View style={styles.socialContainer}>
    <TouchableOpacity style={styles.socialButton} onPress={onGoogle}>
      <Image source={googleIcon} style={styles.icon} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.socialButton} onPress={onApple}>
      <Image source={appleIcon} style={styles.icon} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.socialButton} onPress={onFacebook}>
      <Image source={facebookIcon} style={styles.icon} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    marginHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});

export default SocialLoginButtons; 