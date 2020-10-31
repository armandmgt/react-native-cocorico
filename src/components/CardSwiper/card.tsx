import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import Animated from 'react-native-reanimated';

import type { Profile } from './index';

interface Props {
  profile: Profile;
  likeOpacity?: number | Animated.Node<number>;
  nopeOpacity?: number | Animated.Node<number>;
}

const Card: FunctionComponent<Props> = ({
  profile,
  likeOpacity = 0,
  nopeOpacity = 0,
}) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Image source={profile.profile} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Animated.View
            style={[styles.labelBox, styles.like, { opacity: likeOpacity }]}
          >
            <Text style={[styles.label, styles.like]}>LIKE</Text>
          </Animated.View>
          <Animated.View
            style={[styles.labelBox, styles.nope, { opacity: nopeOpacity }]}
          >
            <Text style={[styles.label, styles.nope]}>NOPE</Text>
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.name}>{profile.name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
  },
  name: {
    color: 'white',
    fontSize: 32,
  },
  label: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  labelBox: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
  },
  like: {
    borderColor: '#6ee3b4',
    color: '#6ee3b4',
  },
  nope: {
    borderColor: '#ec5288',
    color: '#ec5288',
  },
});

export default Card;
