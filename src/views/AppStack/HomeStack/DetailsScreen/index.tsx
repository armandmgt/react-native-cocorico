import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'HomeNavigator'>>;
}

const DetailsScreen: FunctionComponent<Props> = () => {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
};

export default DetailsScreen;
