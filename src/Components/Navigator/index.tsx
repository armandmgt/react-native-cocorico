import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../../Views/Auth/AccountScreen';
import EnterPasswordScreen from '../../Views/Auth/Login/EnterPasswordScreen';
import ForgotPasswordScreen from '../../Views/Auth/Login/ForgotPasswordScreen';
import CreatePasswordScreen from '../../Views/Auth/Register/CreatePasswordScreen';
import CreateProfileScreen from '../../Views/Auth/Register/CreateProfileScreen';

const AuthStackNavigator = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator initialRouteName="Account">
      <AuthStack.Screen name="Account" component={AccountScreen} />
      <AuthStack.Screen name="Login" component={LoginStackNavigator} />
      <AuthStack.Screen name="Register" component={RegisterStackNavigator} />
    </AuthStack.Navigator>
  );
};

const LoginStackNavigator = () => {
  const LoginStack = createStackNavigator();

  return (
    <LoginStack.Navigator initialRouteName="EnterPassword">
      <LoginStack.Screen name="EnterPassword" component={EnterPasswordScreen} />
      <LoginStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
    </LoginStack.Navigator>
  );
};

const RegisterStackNavigator = () => {
  const RegisterStack = createStackNavigator();

  return (
    <RegisterStack.Navigator initialRouteName="CreatePassword">
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

const Navigator = () => {
  const SwitchNavigator = {
    Auth: <AuthStackNavigator />,
  };
  const state = 'Auth';

  return <NavigationContainer>{SwitchNavigator[state]}</NavigationContainer>;
};

export default Navigator;
