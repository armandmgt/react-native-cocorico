import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Button, View, Text } from 'react-native';

import type { LoginStackParamList } from '@cocorico/Components/Navigator/types';

interface Props {
  navigation: StackNavigationProp<LoginStackParamList, 'ForgotPassword'>;
}

const ForgotPasswordScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>ForgotPassword Screen</Text>
      <Button
        title="pushEnterPassword"
        onPress={() => navigation.push('EnterPassword')}
      />
      <Button title="goBack" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ForgotPasswordScreen;
