import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import EnterPasswordScreen from '@cocorico/views/AuthStack/LoginStack/EnterPasswordScreen';
import ForgotPasswordConfirmationScreen from '@cocorico/views/AuthStack/LoginStack/ForgotPasswordConfirmationScreen';
import ForgotPasswordScreen from '@cocorico/views/AuthStack/LoginStack/ForgotPasswordScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

const LoginStackNavigator = () => {
  const LoginStack = createStackNavigator<
    TypedNavigatorParams<'LoginNavigator'>
  >();

  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen component={EnterPasswordScreen} name="EnterPassword" />
      <LoginStack.Screen
        component={ForgotPasswordScreen}
        name="ForgotPassword"
      />
      <LoginStack.Screen
        component={ForgotPasswordConfirmationScreen}
        name="ForgotPasswordConfirmation"
      />
    </LoginStack.Navigator>
  );
};

export default LoginStackNavigator;
