import React, {useRef, useState} from 'react';
import {View, TextInput} from 'react-native';
import styles from './Styles';
import {Colors} from '../Styles/colors';

interface OTPInputProps {
  length: number;
  value: string;
  onChangeText: (text: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({length, value, onChangeText}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newValue = value.split('');
    newValue[index] = text;
    const updatedValue = newValue.join('');
    onChangeText(updatedValue);

    // Move to next input if text is entered
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Move to previous input on backspace
    if (key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <View style={styles.otpContainer}>
      {Array.from({length}, (_, index) => (
        <TextInput
          key={index}
          ref={ref => {
            inputRefs.current[index] = ref;
          }}
          style={[
            styles.otpInput,
            focusedIndex === index && styles.otpInputFocused,
            value[index] && styles.otpInputFilled,
          ]}
          value={value[index] || ''}
          onChangeText={text => handleChangeText(text, index)}
          onKeyPress={({nativeEvent}) => handleKeyPress(nativeEvent.key, index)}
          onFocus={() => handleFocus(index)}
          maxLength={1}
          keyboardType="numeric"
          textAlign="center"
          secureTextEntry
        />
      ))}
    </View>
  );
};

export default OTPInput;
