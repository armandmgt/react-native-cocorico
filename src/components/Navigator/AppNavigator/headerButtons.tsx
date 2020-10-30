import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';
import {
  StackNavigationProp,
  StackHeaderLeftButtonProps,
  StackHeaderTitleProps,
} from '@react-navigation/stack';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import colors from '@cocorico/constants/colors';

import styles from './headerButtons.styles';

interface HeaderTitleProps extends StackHeaderTitleProps {
  navigation: StackNavigationProp<TypedNavigatorParams<'AppNavigator'>>;
}

const HeaderTitle: FunctionComponent<HeaderTitleProps> = ({
  navigation,
  children,
}) => {
  const handlePress = () =>
    navigation.navigate('HomeNavigator', { screen: 'Home' });

  return (
    <Text style={styles.title} onPress={handlePress}>
      {children}
    </Text>
  );
};

interface HeaderProfileProps extends StackHeaderLeftButtonProps {
  navigation: StackNavigationProp<TypedNavigatorParams<'AppNavigator'>>;
}

const HeaderProfile: FunctionComponent<HeaderProfileProps> = ({
  navigation,
}) => {
  const handlePress = () =>
    navigation.navigate('ProfileNavigator', { screen: 'Profile' });

  return (
    <Icon
      color={colors.gradient2}
      name="user"
      size={20}
      style={styles.iconLeft}
      onPress={handlePress}
    />
  );
};

interface HeaderMailboxProps {
  navigation: StackNavigationProp<TypedNavigatorParams<'AppNavigator'>>;
}

const HeaderMailbox: FunctionComponent<HeaderMailboxProps> = ({
  navigation,
}) => {
  const handlePress = () => navigation.navigate('Mailbox');

  return (
    <Icon
      color={colors.gradient2}
      name="message-circle"
      size={20}
      style={styles.iconRight}
      onPress={handlePress}
    />
  );
};

export { HeaderTitle, HeaderProfile, HeaderMailbox };
