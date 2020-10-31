import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import CCRCButton from '@cocorico/components/CCRC/Button';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase from '@cocorico/services/firebase';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'ProfileNavigator'>>;
}

const SettingsScreen: FunctionComponent<Props> = () => {
  return (
    <View style={styles.container}>
      <CCRCButton
        buttonStyle={styles.logoutButton}
        title="logout"
        onPress={() => Firebase.logout()}
      />
    </View>
  );
};

export default SettingsScreen;
