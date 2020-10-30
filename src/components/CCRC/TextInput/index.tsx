import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import {
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  Text,
  ViewStyle,
} from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';

import colors from '@cocorico/constants/colors';

import styles from './index.styles';

export interface CustomTextInputHandle {
  focus(): void;
}

interface Props extends TextInputProps {
  outline?: boolean;
  valid?: boolean;
  error?: string;
  errorPosition?: 'absolute' | 'relative';
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  anchorStyle?: ViewStyle;
  errorStyle?: TextStyle;
}

const CustomTextInput = forwardRef<CustomTextInputHandle, Props>(
  (
    {
      outline,
      valid,
      error,
      errorPosition = 'relative',
      style,
      containerStyle,
      inputStyle,
      anchorStyle,
      errorStyle,
      secureTextEntry,
      ...other
    },
    forwardedRef,
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const showVisibility = secureTextEntry === true;
    const textInputRef = useRef<TextInput>(null);

    useImperativeHandle(forwardedRef, () => ({
      focus: () => {
        textInputRef.current?.focus();
      },
    }));

    const toggleVisibility = () => {
      setPasswordVisible((oldPasswordVisible) => !oldPasswordVisible);
    };

    return (
      <View style={style}>
        <View
          style={[
            styles.root,
            outline && styles.rootOutlined,
            valid === false && styles.rootInvalid,
            containerStyle,
          ]}
        >
          <TextInput
            ref={textInputRef}
            secureTextEntry={secureTextEntry && !passwordVisible}
            selectionColor={colors.BLACK}
            style={[styles.input, inputStyle]}
            {...other}
          />
          {showVisibility && (
            <View style={styles.visibilityContainer}>
              <Icon
                color={colors.BLACK}
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={24}
                style={styles.visibilityIcon}
                onPress={toggleVisibility}
              />
            </View>
          )}
        </View>
        <View style={[styles.anchor, anchorStyle]}>
          {error !== undefined && (
            <Text
              style={[
                styles.errorText,
                errorStyle,
                { position: errorPosition },
              ]}
            >
              {error}
            </Text>
          )}
        </View>
      </View>
    );
  },
);

export default CustomTextInput;
