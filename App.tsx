/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
const whiteColor = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
