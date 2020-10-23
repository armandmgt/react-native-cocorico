import React, { FunctionComponent, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  Text,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import colors from '@cocorico/constants/colors';

import styles from './index.styles';

interface Props extends TextInputProps {
  outline?: boolean;
  valid?: boolean;
  error?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

const CustomTextInput: FunctionComponent<Props> = ({
  outline,
  valid,
  error,
  style,
  inputStyle,
  secureTextEntry,
  ...other
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const showVisibility = secureTextEntry === true;

  const toggleVisibility = () => {
    setPasswordVisible((oldPasswordVisible) => !oldPasswordVisible);
  };

  return (
    <>
      <View
        style={[
          styles.root,
          outline && styles.rootOutlined,
          valid === false && styles.rootInvalid,
          style,
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          selectionColor={colors.BLACK}
          secureTextEntry={secureTextEntry && !passwordVisible}
          {...other}
        />
        {showVisibility && (
          <TouchableWithoutFeedback onPress={toggleVisibility}>
            <Feather
              style={styles.icon}
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={24}
              color={colors.BLACK}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      <View style={styles.anchor}>
        {error !== undefined && (
          <Text style={[styles.errorText, styles.anchorItem]}>{error}</Text>
        )}
      </View>
    </>
  );
};

export default CustomTextInput;
