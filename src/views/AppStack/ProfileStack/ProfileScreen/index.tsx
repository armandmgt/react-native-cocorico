import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'ProfileNavigator'>>;
}

const ProfileScreen: FunctionComponent<Props> = () => {
  return (
    <View>
      <Text>Mailbox Screen</Text>
    </View>
  );
};

export default ProfileScreen;
