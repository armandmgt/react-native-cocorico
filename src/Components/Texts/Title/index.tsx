import React, { FunctionComponent } from 'react';
import { StyleSheet, Text } from 'react-native';

interface TitleProps {
  children: React.ReactNode;
}

const Title: FunctionComponent<TitleProps> = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

Title.defaultProps = {
  children: null,
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    fontSize: 52,
    fontWeight: 'bold',
  },
});

export default Title;