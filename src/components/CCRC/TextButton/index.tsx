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

const CCRCTextButton: FunctionComponent<Props> = ({
  title,
  disabled,
  style,
  titleStyle,
  ...other
}) => {
  return (
    <TouchableOpacity disabled={disabled} style={style} {...other}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CCRCTextButton;
