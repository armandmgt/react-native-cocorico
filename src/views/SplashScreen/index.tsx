import React from 'react';
import { View } from 'react-native';

import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
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
import { Asset } from 'expo-asset';
import { loadAsync as loadFontAsync } from 'expo-font';
import { connect } from 'react-redux';

import type { Dispatch } from '@cocorico/services/store';

import ImageSources from '@cocorico/assets/images';

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

  Pacifico_400Regular,
};

interface Props extends DispatchProps {}

const SplashScreen = ({ setAppStatus }: Props) => {
  const startupAsync = async () => {
    await loadFontAsync(customFonts);
    await Asset.loadAsync([
      ImageSources.defaultProfile,
      ImageSources.emptyAnimationGif,
    ]);
    setAppStatus('LOADED');
  };

  startupAsync();

  return <View />;
};

const mapDispatch = ({ session: { setAppStatus } }: Dispatch) => ({
  setAppStatus,
});
type DispatchProps = ReturnType<typeof mapDispatch>;
export default connect(null, mapDispatch)(SplashScreen);
