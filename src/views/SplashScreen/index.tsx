import React from 'react';

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
import { loadAsync } from 'expo-font';
import { connect } from 'react-redux';

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

const SplashScreen = ({ setAppStatus }: Props) => {
  const startupAsync = async () => {
    await loadAsync(customFonts);
    setAppStatus('LOADED');
  };

  setTimeout(startupAsync, 500);

  return <AppLoading />;
};

const mapDispatch = ({ session: { setAppStatus } }: Dispatch) => ({
  setAppStatus,
});
type DispatchProps = ReturnType<typeof mapDispatch>;
export default connect(null, mapDispatch)(SplashScreen);
