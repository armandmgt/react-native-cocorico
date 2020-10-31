import React from 'react';

import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';

import MessageScreen from '@cocorico/views/AppStack/MessagesStack/MessageScreen';
import MessagesScreen from '@cocorico/views/AppStack/MessagesStack/MessagesScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import colors from '@cocorico/constants/colors';

import { HeaderBack, HeaderHome } from '../headerButtons';
import { fromRight } from '../transitions';

interface NavigationRoute {
  navigation: StackNavigationProp<
    TypedNavigatorParams<'AppNavigator' | 'MessagesNavigator'>
  >;
  route: RouteProp<Record<string, object | undefined>, string>;
}

export const getMessagesStackOptions = (): StackNavigationOptions => ({
  headerStyle: {
    backgroundColor: colors.WHITE_ACCENT,
  },
  headerTitleStyle: {
    fontSize: 18,
    color: colors.BLACK,
  },
  headerTitleAlign: 'center',
  ...fromRight,
});

const getMessagesScreenOptions = ({
  navigation,
}: NavigationRoute): StackNavigationOptions => ({
  title: 'Messages',
  headerLeft: () => (
    <HeaderHome
      direction="left"
      side="left"
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: () => null,
});

const getMessageScreenOptions = ({
  navigation,
}: NavigationRoute): StackNavigationOptions => ({
  title: 'Conversation',
  headerLeft: () => (
    <HeaderBack side="left" onPress={() => navigation.goBack()} />
  ),
  headerRight: () => null,
});

const MessagesStackNavigator = () => {
  const MessagesStack = createStackNavigator<
    TypedNavigatorParams<'MessagesNavigator'>
  >();

  return (
    <MessagesStack.Navigator screenOptions={getMessagesStackOptions}>
      <MessagesStack.Screen
        component={MessagesScreen}
        name="Messages"
        options={getMessagesScreenOptions}
      />
      <MessagesStack.Screen
        component={MessageScreen}
        name="Message"
        options={getMessageScreenOptions}
      />
    </MessagesStack.Navigator>
  );
};

export default MessagesStackNavigator;
