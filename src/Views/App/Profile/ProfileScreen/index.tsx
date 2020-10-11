import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import type { ProfileStackParamList } from '@cocorico/Components/Navigator';

interface Props {
  navigation: StackNavigationProp<ProfileStackParamList, 'Account'>;
}

const ProfileScreen: FunctionComponent<Props> = () => {
  return <View>Profile Screen</View>;
};

export default ProfileScreen;
