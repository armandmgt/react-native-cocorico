import React, { FunctionComponent, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  notificationAsync,
  selectionAsync,
  NotificationFeedbackType,
} from 'expo-haptics';
import Animated from 'react-native-reanimated';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Card from './card';
import type { Profile } from './Profile';
import styles from './touchableCard.styles';

interface TouchableAreaProps {
  onPress?: () => void;
  style?: ViewStyle;
}

const TouchableArea = ({ onPress, style }: TouchableAreaProps) => (
  <TouchableWithoutFeedback {...{ onPress }}>
    <View style={[styles.touchableAreaContent, style]} />
  </TouchableWithoutFeedback>
);

interface Props {
  profile: Profile;
  likeOpacity?: number | Animated.Node<number>;
  nopeOpacity?: number | Animated.Node<number>;
}

const TouchableCard: FunctionComponent<Props> = ({
  profile,
  likeOpacity = 0,
  nopeOpacity = 0,
}) => {
  const navigation = useNavigation<
    StackNavigationProp<TypedNavigatorParams<'HomeNavigator'>>
  >();

  const [pictureIndex, setPictureIndex] = useState<number>(0);

  function increasePictureIndex() {
    if (pictureIndex === profile.pictures.length - 1) return false;
    setPictureIndex(pictureIndex + 1);
    return true;
  }

  function decreasePictureIndex() {
    if (pictureIndex === 0) return false;
    setPictureIndex(pictureIndex - 1);
    return true;
  }

  function onPressLeft() {
    const status = decreasePictureIndex();

    if (status) selectionAsync();
    else notificationAsync(NotificationFeedbackType.Warning);
  }

  function onPressRight() {
    const status = increasePictureIndex();

    if (status) selectionAsync();
    else notificationAsync(NotificationFeedbackType.Warning);
  }

  function onPressBottom() {
    selectionAsync();
    navigation.push('Details');
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <Card
        picture={profile.pictures[pictureIndex]}
        {...{ profile, likeOpacity, nopeOpacity }}
      />
      <View style={styles.touchables}>
        <View style={styles.touchablesHorizontal}>
          <TouchableArea onPress={onPressLeft} />
          <TouchableArea onPress={onPressRight} />
        </View>
        <TouchableArea onPress={onPressBottom} />
      </View>
    </View>
  );
};

export default TouchableCard;