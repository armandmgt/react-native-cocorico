import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import Animated from 'react-native-reanimated';

import styles from './card.styles';
import type { Profile } from './Profile';

interface Props {
  profile: Profile;
  picture: Profile['pictures'][number];
  likeOpacity?: number | Animated.Node<number>;
  nopeOpacity?: number | Animated.Node<number>;
}

const Card: FunctionComponent<Props> = ({
  profile,
  picture,
  likeOpacity = 0,
  nopeOpacity = 0,
}) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Image source={picture} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Animated.View
            style={[styles.labelBox, styles.like, { opacity: likeOpacity }]}
          >
            <Text style={[styles.label, styles.like]}>COCORIYEAH</Text>
          </Animated.View>
          <Animated.View
            style={[styles.labelBox, styles.nope, { opacity: nopeOpacity }]}
          >
            <Text style={[styles.label, styles.nope]}>COCORINOPE</Text>
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <Text style={[styles.name, styles.shadow]}>{profile.name}</Text>
          <Text style={[styles.age, styles.shadow]}>
            {profile.age}
            <Text style={[styles.ageYears]}>ans</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
