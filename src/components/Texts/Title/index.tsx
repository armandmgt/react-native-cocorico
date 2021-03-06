import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

import { Roboto } from '@cocorico/constants/fonts';

interface TitleProps {
  style?: StyleProp<TextStyle>;
}

const Title: FunctionComponent<TitleProps> = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Roboto[900],
    fontSize: 50,
  },
});

export default Title;
