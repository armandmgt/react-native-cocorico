import React, { FunctionComponent } from 'react';
import {
  ButtonProps,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import styles from './index.styles';

interface Props extends ButtonProps {
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

const CustomTextButton: FunctionComponent<Props> = ({
  title,
  disabled,
  style,
  titleStyle,
  ...other
}) => {
  return (
    <TouchableOpacity style={style} disabled={disabled} {...other}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomTextButton;
