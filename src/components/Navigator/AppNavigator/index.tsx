import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MailboxScreen from '@cocorico/views/AppStack/MailboxScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import HomeStackNavigator from './HomeNavigator';
import ProfileStackNavigator from './ProfileNavigator';

const AppStackNavigator = () => {
  const AuthStack = createStackNavigator<
    TypedNavigatorParams<'AppNavigator'>
  >();

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="HomeNavigator" component={HomeStackNavigator} />
      <AuthStack.Screen name="Mailbox" component={MailboxScreen} />
      <AuthStack.Screen
        name="ProfileNavigator"
        component={ProfileStackNavigator}
      />
    </AuthStack.Navigator>
  );
};

export default AppStackNavigator;
