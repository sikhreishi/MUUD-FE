import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme/theme';



const MuudButton = ({
  title = '',
  onPress = () => {},
  style = {},
  textStyle = {},
  variant = 'primary',
  disabled = false,
  ...props
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      variant === 'secondary' ? styles.secondary : styles.primary,
      style,
      disabled && { opacity: 0.6 },
    ]}
    onPress={onPress}
    disabled={disabled}
    {...props}
  >
    <Text style={[
      styles.buttonText,
      variant === 'secondary' ? styles.secondaryText : styles.primaryText,
      textStyle,
    ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 28,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  primary: {
    backgroundColor: "#3d215b",
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "#3d215b",
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: "#3d215b",
  },
});

export default MuudButton; 