import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import type { HomeStackParamList } from '@cocorico/components/Navigator';

interface Props {
  navigation: StackNavigationProp<HomeStackParamList, 'Account'>;
}

const HomeScreen: FunctionComponent<Props> = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
