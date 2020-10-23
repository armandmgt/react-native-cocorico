import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '@cocorico/views/AppStack/ProfileStack/ProfileScreen';
import SettingsScreen from '@cocorico/views/AppStack/ProfileStack/SettingsScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

const LoginStackNavigator = () => {
  const LoginStack = createStackNavigator<
    TypedNavigatorParams<'ProfileNavigator'>
  >();

  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Profile" component={ProfileScreen} />
      <LoginStack.Screen name="Settings" component={SettingsScreen} />
    </LoginStack.Navigator>
  );
};

export default LoginStackNavigator;
