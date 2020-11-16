import React, { FunctionComponent, useRef } from 'react';
import { Image, View, Text, Platform } from 'react-native';

import LottieView from 'lottie-react-native';

import Images from '@cocorico/assets/images';
import LottieAnimations from '@cocorico/assets/lottie';

import styles from './emptyCard.styles';

interface Props {}

const EmptyCard: FunctionComponent<Props> = () => {
  const animation = useRef<LottieView>(null);

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <LottieView
          autoPlay
          loop
          ref={animation}
          source={LottieAnimations.barnYard}
          style={styles.animation}
        />
      ) : (
        <Image
          resizeMode="contain"
          source={Images.emptyAnimationGif}
          style={styles.fallbackAnimation}
        />
      )}
      <Text style={styles.text}>
        Reviens plus tard, tu as épuisé notre stock de poules...
      </Text>
    </View>
  );
};

export default EmptyCard;
