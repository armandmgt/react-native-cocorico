import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import type { HomeStackParamList } from '@cocorico/components/Navigator';

interface Props {
  navigation: StackNavigationProp<HomeStackParamList, 'Account'>;
}

const HomeScreen: FunctionComponent<Props> = () => {
  return <View>Home Screen</View>;
};

export default HomeScreen;
