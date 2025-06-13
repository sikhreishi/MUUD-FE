import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle, TextStyle, TextInputProps, Text } from 'react-native';

const MuudInput = ({
  value = '',
  onChangeText = () => {} ,
  placeholder = '',
  secureTextEntry = false,
  showToggle = false,
  onToggleShow = () => {},
  style = {},
  inputStyle = {},
  ...props
}) => (
  <View style={[styles.inputContainer, style]}>
    <TextInput
      style={[styles.input, inputStyle]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#888"
      secureTextEntry={secureTextEntry}
      {...props}
    />
    {showToggle && (
      <TouchableOpacity onPress={onToggleShow} style={styles.toggleButton}>
        <Text style={styles.toggleText}>{secureTextEntry ? 'Show' : 'Hide'}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  toggleButton: {
    padding: 4,
  },
  toggleText: {
    color: '#888',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MuudInput; 