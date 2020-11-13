import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import HomeStackNavigator, { getHomeStackOptions } from './HomeNavigator';
import MessagesStackNavigator, {
  getMessagesStackOptions,
} from './MessagesNavigator';
import ProfileStackNavigator, {
  getProfileStackOptions,
} from './ProfileNavigator';

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
      <AppStack.Screen
        component={MessagesStackNavigator}
        name="MessagesNavigator"
        options={getMessagesStackOptions}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
