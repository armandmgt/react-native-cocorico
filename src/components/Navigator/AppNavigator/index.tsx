import React from 'react';

import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import colors from '@cocorico/constants/colors';

import { HeaderHome } from './headerButtons';
import HomeStackNavigator, { getHomeStackOptions } from './HomeNavigator';
import MessagesStackNavigator from './MessagesNavigator';
import ProfileStackNavigator, {
  getProfileStackOptions,
} from './ProfileNavigator';
import { fromRight } from './transitions';

const getMailboxScreenOptions = ({
  navigation,
}: {
  navigation: StackNavigationProp<TypedNavigatorParams<'AppNavigator'>>;
}): StackNavigationOptions => ({
  headerShown: true,
  headerStyle: {
    backgroundColor: colors.WHITE_ACCENT,
  },
  headerTitleStyle: {
    fontSize: 18,
    color: colors.BLACK,
  },
  headerTitleAlign: 'center',
  title: 'Mailbox',
  headerLeft: () => (
    <HeaderHome
      direction="left"
      side="left"
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  headerRight: () => null,
  ...fromRight,
});

const AppStackNavigator = () => {
  const AppStack = createStackNavigator<TypedNavigatorParams<'AppNavigator'>>();

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen
        component={HomeStackNavigator}
        name="HomeNavigator"
        options={getHomeStackOptions}
      />
      <AppStack.Screen
        component={ProfileStackNavigator}
        name="ProfileNavigator"
        options={getProfileStackOptions}
      />
      {/* <AppStack.Screen
        component={MailboxScreen}
        name="Mailbox"
        options={getMailboxScreenOptions}
      /> */}
      <AppStack.Screen
        component={MessagesStackNavigator}
        name="MessagesNavigator"
        options={getMailboxScreenOptions}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
