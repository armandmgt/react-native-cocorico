import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'AppNavigator'>>;
}

const MailboxScreen: FunctionComponent<Props> = () => {
  return <View style={styles.container} />;
};

export default MailboxScreen;
