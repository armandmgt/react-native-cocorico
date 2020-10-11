import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import type { NestedNavigatorParams } from '@cocorico/Constants/types';
import AccountScreen from '@cocorico/Views/Auth/AccountScreen';

import LoginStackNavigator, { LoginStackParamList } from './LoginNavigator';
import RegisterStackNavigator, {
  RegisterStackParamList,
} from './RegisterNavigator';

type AuthStackParamList = {
  Account: undefined;
  Login: NestedNavigatorParams<LoginStackParamList>;
  Register: NestedNavigatorParams<RegisterStackParamList>;
};

const AuthStackNavigator = () => {
  const AuthStack = createStackNavigator<AuthStackParamList>();

  return (
    <AuthStack.Navigator initialRouteName="Account">
      <AuthStack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginStackNavigator}
      />
      <AuthStack.Screen
        name="Register"
        options={{ headerShown: false }}
        component={RegisterStackNavigator}
      />
    </AuthStack.Navigator>
  );
};

export type { LoginStackParamList, RegisterStackParamList, AuthStackParamList };
export default AuthStackNavigator;
