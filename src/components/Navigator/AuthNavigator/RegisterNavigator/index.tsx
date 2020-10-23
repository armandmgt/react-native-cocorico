import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CreatePasswordScreen from '@cocorico/views/AuthStack/RegisterStack/CreatePasswordScreen';
import CreateProfileScreen from '@cocorico/views/AuthStack/RegisterStack/CreateProfileScreen';

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
        name="CreateProfile"
        component={CreateProfileScreen}
      />
    </RegisterStack.Navigator>
  );
};

export default RegisterStackNavigator;
