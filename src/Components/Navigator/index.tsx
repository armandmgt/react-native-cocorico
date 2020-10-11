import * as React from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../../Views/SplashScreen';

import AccountScreen from '../../Views/Auth/AccountScreen';
import EnterPasswordScreen from '../../Views/Auth/Login/EnterPasswordScreen';
import ForgotPasswordScreen from '../../Views/Auth/Login/ForgotPasswordScreen';
import CreatePasswordScreen from '../../Views/Auth/Register/CreatePasswordScreen';
import CreateProfileScreen from '../../Views/Auth/Register/CreateProfileScreen';

import { RootState } from '../../Services/Store';
import { AuthStatus } from '../../Constants/types';

type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] };
}[keyof ParamList];

export type SplashStackParamList = {
  Splash: undefined;
};

export type AuthStackParamList = {
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

export type RegisterStackParamList = {
  CreatePassword: undefined;
  CreateProfile: undefined;
};

const RegisterStackNavigator = () => {
  const RegisterStack = createStackNavigator<RegisterStackParamList>();

  return (
    <RegisterStack.Navigator initialRouteName="CreateProfile">
      <RegisterStack.Screen
        name="CreateProfile"
        options={{ headerShown: false }}
        component={CreateProfileScreen}
      />
      <RegisterStack.Screen
        name="CreatePassword"
        options={{ headerShown: false }}
        component={CreatePasswordScreen}
      />
    </RegisterStack.Navigator>
  );
};

interface Props extends StateProps {}

const Navigator = ({ authStatus }: Props) => {
  const SwitchNavigator: { [key in AuthStatus]: React.ReactNode } = {
    LOADING: <SplashScreen />,
    LOGGED_OUT: <AuthStackNavigator />,
    LOGGED_IN: null,
  };

  return (
    <NavigationContainer>{SwitchNavigator[authStatus]}</NavigationContainer>
  );
};

const mapState = ({ auth: { status } }: RootState) => ({
  authStatus: status,
});
type StateProps = ReturnType<typeof mapState>;

export default connect(mapState)(Navigator);
