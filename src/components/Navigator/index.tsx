import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

import SplashScreen from '@cocorico/views/SplashScreen';

import { auth } from '@cocorico/services/firebase';
import type { RootState, Dispatch } from '@cocorico/services/store';

import type {
  AppStatus,
  AuthStatus,
  SwitchNavigatorKey,
} from '@cocorico/constants/types';

import AppStackNavigator from './AppNavigator';
import AuthStackNavigator from './AuthNavigator';

interface Props extends StateProps, DispatchProps {}

const Navigator = ({ appStatus, authStatus, setAuthStatus }: Props) => {
  const SwitchNavigator: { [key in SwitchNavigatorKey]: React.ReactNode } = {
    SPLASH: <SplashScreen />,
    AUTH: <AuthStackNavigator />,
    APP: <AppStackNavigator />,
  };

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      try {
        await (authUser
          ? setAuthStatus('LOGGED_IN')
          : setAuthStatus('LOGGED_OUT'));
      } catch (error) {
        throw Error(error);
      }
    });
    return unsubscribeAuth;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSwitchNavigatorKey = (
    _appStatus: AppStatus,
    _authStatus: AuthStatus,
  ) => {
    if (_appStatus !== 'LOADED') return 'SPLASH';

    switch (_authStatus) {
      case 'LOADING':
        return 'SPLASH';
      case 'LOGGED_IN':
        return 'APP';
      case 'LOGGED_OUT':
        return 'AUTH';
      default:
        return 'SPLASH';
    }
  };

  const switchNavigatorKey: SwitchNavigatorKey = getSwitchNavigatorKey(
    appStatus,
    authStatus,
  );

  return (
    <NavigationContainer>
      {SwitchNavigator[switchNavigatorKey]}
    </NavigationContainer>
  );
};

const mapState = ({
  session: { appStatus },
  auth: { authStatus },
}: RootState) => ({
  appStatus,
  authStatus,
});
type StateProps = ReturnType<typeof mapState>;

const mapDispatch = ({ auth: { setAuthStatus } }: Dispatch) => ({
  setAuthStatus,
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(Navigator);
