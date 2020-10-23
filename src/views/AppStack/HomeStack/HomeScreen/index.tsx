import React, { FunctionComponent } from 'react';
import { Button, View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import { auth } from '@cocorico/services/firebase';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'AppNavigator'>>;
}

const HomeScreen: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="go to profile"
        onPress={() => {
          navigation.push('ProfileNavigator', { screen: 'Profile' });
        }}
      />
      <Button
        title="disconnect"
        onPress={async () => {
          try {
            await auth.signOut();
          } catch (err) {
            console.error(err);
          }
        }}
      />
    </View>
  );
};

export default HomeScreen;
