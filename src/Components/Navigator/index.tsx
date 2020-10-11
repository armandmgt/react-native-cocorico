import React from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '@cocorico/Views/SplashScreen';
import type { AuthStatus } from '@cocorico/Constants/types';
import type { RootState } from '@cocorico/Services/Store';

import AuthStackNavigator from './AuthNavigator';

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
