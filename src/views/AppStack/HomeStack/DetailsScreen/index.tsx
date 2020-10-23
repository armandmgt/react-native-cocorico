import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import type { HomeStackParamList } from '@cocorico/components/Navigator';

interface Props {
  navigation: StackNavigationProp<HomeStackParamList, 'Account'>;
}

const DetailsScreen: FunctionComponent<Props> = () => {
  return <View>Details Screen</View>;
};

export default DetailsScreen;
