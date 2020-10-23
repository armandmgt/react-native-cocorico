import React, { FunctionComponent } from 'react';
import { Button, View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

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
    </View>
  );
};

export default HomeScreen;
