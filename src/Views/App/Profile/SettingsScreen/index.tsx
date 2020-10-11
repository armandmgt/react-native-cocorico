import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import type { ProfileStackParamList } from '@cocorico/Components/Navigator';

interface Props {
  navigation: StackNavigationProp<ProfileStackParamList, 'Account'>;
}

const SettingsScreen: FunctionComponent<Props> = () => {
  return <View>Settings Screen</View>;
};

export default SettingsScreen;
