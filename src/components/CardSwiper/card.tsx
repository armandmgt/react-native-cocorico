import React, { FunctionComponent } from 'react';
import { View, Image, Text, ViewStyle } from 'react-native';

import Animated from 'react-native-reanimated';

import { UserData } from '@cocorico/constants/types';

import ImageSources from '@cocorico/assets/images';

import styles from './card.styles';

interface Props {
  profile: UserData;
  picture: any | undefined;
  likeOpacity?: number | Animated.Node<number>;
  nopeOpacity?: number | Animated.Node<number>;
  style?: ViewStyle;
  shouldDisplay?: boolean;
}

const Card: FunctionComponent<Props> = ({
  profile,
  picture,
  likeOpacity = 0,
  nopeOpacity = 0,
  shouldDisplay = false,
  style,
}) => {
  return (
    <View key={profile.id} style={[styles.container, style]}>
      {shouldDisplay && (
        <Image
          source={picture ? { uri: picture } : ImageSources.defaultProfile}
          style={styles.image}
        />
      )}
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
          <Text style={[styles.name, styles.shadow]}>{profile.firstName}</Text>
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
