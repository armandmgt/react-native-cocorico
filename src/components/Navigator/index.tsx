import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '@cocorico/views/SplashScreen';
import MessagesScreen from '@cocorico/views/AppStack/MessagesScren';
import { auth } from '@cocorico/services/firebase';
import type { StackNavigator } from '@cocorico/constants/types';
import type { RootState, Dispatch } from '@cocorico/services/store';

import AuthStackNavigator from './AuthNavigator';

interface Props extends StateProps, DispatchProps {}

const Navigator = ({ appStatus, authStatus, setAuthStatus }: Props) => {
  const SwitchNavigator: { [key in StackNavigator]: React.ReactNode } = {
    SPLASH: <SplashScreen />,
    AUTH: <AuthStackNavigator />,
    APP: <MessagesScreen />,
  };

  console.log('Status :', appStatus, authStatus);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      try {
        console.log('Auth User :', authUser);
        await (authUser
          ? setAuthStatus('LOGGED_IN')
          : setAuthStatus('LOGGED_OUT'));
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribeAuth;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let stackNavigator: StackNavigator;

  if (appStatus === 'LOADING' || authStatus === 'LOADING')
    stackNavigator = 'SPLASH';
  else if (appStatus === 'LOADED' && authStatus === 'LOGGED_IN')
    stackNavigator = 'APP';
  else if (appStatus === 'LOADED' && authStatus === 'LOGGED_OUT')
    stackNavigator = 'AUTH';
  else stackNavigator = 'SPLASH';

  return (
    <NavigationContainer>{SwitchNavigator[stackNavigator]}</NavigationContainer>
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
