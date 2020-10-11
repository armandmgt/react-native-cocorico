/* eslint-disable react/style-prop-object */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/services/store';
import Navigator from './src/components/Navigator';

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
