/* eslint-disable react/style-prop-object */
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import Navigator from './src/components/Navigator';
import store from './src/services/store';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigator />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});

export default App;
