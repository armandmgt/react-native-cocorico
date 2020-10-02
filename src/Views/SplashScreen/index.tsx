import React from 'react';
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
import initializeApp from '../../firebase';
import { Dispatch } from '../../Services/Store';

interface Props extends DispatchProps {}

const SplashScreen = ({ setAuthStatus }: Props) => {
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
  const startupAsync = async () => {
    await Font.loadAsync(customFonts);
    initializeApp();

    console.log('Loaded');

    setAuthStatus('SIGNED_OUT');
  };

  setTimeout(startupAsync, 1000);
  return <AppLoading />;
};

const mapDispatch = ({ session: { setAuthStatus } }: Dispatch) => ({
  setAuthStatus,
});
type DispatchProps = ReturnType<typeof mapDispatch>;
export default connect(null, mapDispatch)(SplashScreen);
