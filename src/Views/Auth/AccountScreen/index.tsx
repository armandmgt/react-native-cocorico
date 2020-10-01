import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Button, View, Text } from 'react-native';

interface Props {
  navigation: StackNavigationProp<any>;
}

const AccountScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Account Screen</Text>
      <Button
        title="navigateLogin"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="navigateRegister"
        onPress={() => navigation.navigate('Register')}
      />
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

export default AccountScreen;
