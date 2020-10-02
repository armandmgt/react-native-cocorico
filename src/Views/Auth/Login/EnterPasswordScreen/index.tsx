import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Button, View, Text } from 'react-native';
import type { LoginStackParamList } from '../../../../Components/Navigator';

interface Props {
  navigation: StackNavigationProp<LoginStackParamList, 'EnterPassword'>;
}

const EnterPasswordScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>EnterPassword Screen</Text>
      <Button
        title="pushForgotPassword"
        onPress={() => navigation.push('ForgotPassword')}
      />
      <Button title="goBack" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default EnterPasswordScreen;
