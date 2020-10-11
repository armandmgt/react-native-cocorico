import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EnterPasswordScreen from '@cocorico/Views/Auth/Login/EnterPasswordScreen';
import ForgotPasswordScreen from '@cocorico/Views/Auth/Login/ForgotPasswordScreen';

export type LoginStackParamList = {
  EnterPassword: undefined;
  ForgotPassword: undefined;
};

const LoginStackNavigator = () => {
  const LoginStack = createStackNavigator<LoginStackParamList>();

  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="EnterPassword"
        options={{ headerShown: false }}
        component={EnterPasswordScreen}
      />
      <LoginStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </LoginStack.Navigator>
  );
};

export default LoginStackNavigator;
