import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Button, View, Text } from 'react-native';
import type { RegisterStackParamList } from '../../../../Components/Navigator';

interface Props {
  navigation: StackNavigationProp<RegisterStackParamList, 'CreatePassword'>;
}

const CreatePasswordScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>CreatePassword Screen</Text>
      <Button
        title="pushCreateProfile"
        onPress={() => navigation.push('CreateProfile')}
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

export default CreatePasswordScreen;
