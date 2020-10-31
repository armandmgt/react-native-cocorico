import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import CCRCButton from '@cocorico/components/CCRC/Button';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'HomeNavigator'>>;
}

const DetailsScreen: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <CCRCButton title="back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;
