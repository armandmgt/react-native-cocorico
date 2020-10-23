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
      <AuthStack.Screen name="Account" component={AccountScreen} />
      <AuthStack.Screen name="LoginNavigator" component={LoginStackNavigator} />
      <AuthStack.Screen
        name="RegisterNavigator"
        component={RegisterStackNavigator}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
