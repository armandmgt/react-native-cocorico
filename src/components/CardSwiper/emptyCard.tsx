import React, { FunctionComponent, useRef } from 'react';
import { View, Text } from 'react-native';

import LottieView from 'lottie-react-native';

import LottieAnimations from '@cocorico/assets/lottie';

import styles from './emptyCard.styles';

interface Props {}

const EmptyCard: FunctionComponent<Props> = () => {
  const animation = useRef<LottieView>(null);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        ref={animation}
        source={LottieAnimations.barnYard}
        style={styles.animation}
      />
      <Text style={styles.text}>
        Reviens plus tard, tu as épuisé notre stock de poules...
      </Text>
    </View>
  );
};

export default EmptyCard;
