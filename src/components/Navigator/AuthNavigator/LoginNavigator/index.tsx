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
      <LoginStack.Screen name="EnterPassword" component={EnterPasswordScreen} />
      <LoginStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <LoginStack.Screen
        name="ForgotPasswordConfirmation"
        component={ForgotPasswordConfirmationScreen}
      />
    </LoginStack.Navigator>
  );
};

export default LoginStackNavigator;
