import React, { FunctionComponent } from 'react';
import {
  ButtonProps,
  View,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import colors from '@cocorico/constants/colors';
import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props extends ButtonProps {
  title: string;
  disabled?: boolean;
  variant?: 'outline' | 'fill' | 'gradient';
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

const CustomButton: FunctionComponent<Props> = ({
  title,
  disabled,
  variant = 'fill',
  style,
  titleStyle,
  ...other
}) => {
  const renderButtonOutline = () => (
    <View
      style={[styles.button, styles.outline, disabled && styles.rootDisabled]}
    >
      <Text style={[styles.title, styles.titleOutline, titleStyle]}>
        {title}
      </Text>
    </View>
  );

  const renderButtonFill = () => (
    <View style={[styles.button, styles.fill, disabled && styles.rootDisabled]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );

  const renderButtonGradient = () => (
    <LinearGradient
      start={[0, 1]}
      end={[1, 0]}
      style={[styles.button, disabled && styles.rootDisabled]}
      colors={[colors.gradient1, colors.gradient2, colors.gradient3]}
    >
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </LinearGradient>
  );

  const renderButton = () => {
    switch (variant) {
      case 'outline':
      default:
        return renderButtonOutline();
      case 'fill':
        return renderButtonFill();
      case 'gradient':
        return renderButtonGradient();
    }
  };

  return (
    <TouchableOpacity style={style} disabled={disabled} {...other}>
      {renderButton()}
    </TouchableOpacity>
  );
};

export default CustomButton;
