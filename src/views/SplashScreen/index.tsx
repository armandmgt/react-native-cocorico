import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_300Light_Italic,
  Roboto_400Regular_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { auth } from '@cocorico/services/firebase';
import type { Dispatch } from '@cocorico/services/store';

const customFonts = {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_300Light_Italic,
  Roboto_400Regular_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
};

interface Props extends DispatchProps {}

const SplashScreen = ({ setAuthStatus }: Props) => {
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      try {
        console.log('Auth User :', authUser);
        // await (authUser ? setUser(authUser) : setUser(null));
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribeAuth;
  }, []);

  const startupAsync = async () => {
    await Font.loadAsync(customFonts);

    setAuthStatus('LOGGED_OUT');
  };

  setTimeout(startupAsync, 1000);
  return <AppLoading />;
};

const mapDispatch = ({ auth: { setStatus } }: Dispatch) => ({
  setAuthStatus: setStatus,
});
type DispatchProps = ReturnType<typeof mapDispatch>;
export default connect(null, mapDispatch)(SplashScreen);
