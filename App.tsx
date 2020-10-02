/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import Navigator from './src/Components/Navigator';

import store from './src/Services/Store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigator />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
