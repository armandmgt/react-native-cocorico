import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '@cocorico/views/AuthStack/AccountScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import LoginStackNavigator from './LoginNavigator';
import RegisterStackNavigator from './RegisterNavigator';

const AuthStackNavigator = () => {
  const AuthStack = createStackNavigator<
    TypedNavigatorParams<'AuthNavigator'>
  >();

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen component={AccountScreen} name="Account" />
      <AuthStack.Screen component={LoginStackNavigator} name="LoginNavigator" />
      <AuthStack.Screen
        component={RegisterStackNavigator}
        name="RegisterNavigator"
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
