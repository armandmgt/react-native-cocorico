import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CreatePasswordScreen from '@cocorico/views/AuthStack/RegisterStack/CreatePasswordScreen';
import CreateAccountScreen from '@cocorico/views/AuthStack/RegisterStack/CreateAccountScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

const RegisterStackNavigator = () => {
  const RegisterStack = createStackNavigator<
    TypedNavigatorParams<'RegisterNavigator'>
  >();

  return (
    <RegisterStack.Navigator screenOptions={{ headerShown: false }}>
      <RegisterStack.Screen
        name="CreatePassword"
        component={CreatePasswordScreen}
      />
      <RegisterStack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
      />
    </RegisterStack.Navigator>
  );
};

export default RegisterStackNavigator;
