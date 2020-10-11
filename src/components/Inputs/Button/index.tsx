import { LinearGradient } from 'expo-linear-gradient';
import React, { FunctionComponent } from 'react';
import {
  ButtonProps,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { Roboto } from '@cocorico/constants/fonts';
import colors from '@cocorico/constants/colors';

interface CustomButtonProps extends ButtonProps {
  style: StyleProp<ViewStyle>;
}
const CustomButton: FunctionComponent<CustomButtonProps> = ({
  style,
  title,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.root, style]}
      disabled={disabled}
      {...props}
    >
      <LinearGradient
        style={styles.gradient}
        colors={
          disabled
            ? [colors.concrete, colors.concrete]
            : [colors.primary, colors.secondary]
        }
      >
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.primary,
    height: 65,
    marginTop: 10,
    borderRadius: 5,
  },
  gradient: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 5,
  },
  title: {
    color: colors.clouds,
    fontSize: 22,
    fontFamily: Roboto[700],
    fontWeight: 'bold',
  },
});

export default CustomButton;
