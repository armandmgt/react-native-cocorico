import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MailboxScreen from '@cocorico/views/AppStack/MailboxScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import HomeStackNavigator from './HomeNavigator';
import ProfileStackNavigator from './ProfileNavigator';

const AppStackNavigator = () => {
  const AppStack = createStackNavigator<TypedNavigatorParams<'AppNavigator'>>();

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="HomeNavigator" component={HomeStackNavigator} />
      <AppStack.Screen name="Mailbox" component={MailboxScreen} />
      <AppStack.Screen
        name="ProfileNavigator"
        component={ProfileStackNavigator}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
