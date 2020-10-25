import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CreateAccountScreen from '@cocorico/views/AuthStack/RegisterStack/CreateAccountScreen';
import CreatePasswordScreen from '@cocorico/views/AuthStack/RegisterStack/CreatePasswordScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

const RegisterStackNavigator = () => {
  const RegisterStack = createStackNavigator<
    TypedNavigatorParams<'RegisterNavigator'>
  >();

  return (
    <RegisterStack.Navigator screenOptions={{ headerShown: false }}>
      <RegisterStack.Screen
        component={CreatePasswordScreen}
        name="CreatePassword"
      />
      <RegisterStack.Screen
        component={CreateAccountScreen}
        name="CreateAccount"
      />
    </RegisterStack.Navigator>
  );
};

export default RegisterStackNavigator;
