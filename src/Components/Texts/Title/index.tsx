import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

interface TitleProps {
  style?: StyleProp<TextStyle>;
}

const Title: FunctionComponent<TitleProps> = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 52,
  },
});

export default Title;
