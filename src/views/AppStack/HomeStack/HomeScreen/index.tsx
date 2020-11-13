import React, { FunctionComponent, useState } from 'react';
import { View } from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import CardSwiper from '@cocorico/components/CardSwiper';
import EmptyCard from '@cocorico/components/CardSwiper/emptyCard';

import colors from '@cocorico/constants/colors';

import ProfilePictures from '@cocorico/assets/images/profiles';

import type { Profile } from '../../../../components/CardSwiper/Profile';
import styles from './index.styles';

interface BottomButtonProps {
  onPress: () => void;
  color: string;
  icon: string;
}

const BottomButton = ({ onPress, color, icon }: BottomButtonProps) => (
  <TouchableOpacity
    style={[styles.bottomIconContainer, { borderColor: color }]}
    {...{ onPress }}
  >
    <Icon color={color} name={icon} size={35} onPress={onPress} />
  </TouchableOpacity>
);

const defaultProfiles: Profile[] = [
  {
    id: '1',
    name: 'Caroline',
    age: 24,
    pictures: [
      ProfilePictures.profile1,
      ProfilePictures.profile2,
      ProfilePictures.profile3,
    ],
  },
  {
    id: '2',
    name: 'Jack',
    age: 30,
    pictures: [ProfilePictures.profile2, ProfilePictures.profile1],
  },
  {
    id: '3',
    name: 'Anet',
    age: 21,
    pictures: [ProfilePictures.profile3, ProfilePictures.profile1],
  },
  {
    id: '4',
    name: 'John',
    age: 28,
    pictures: [ProfilePictures.profile4, ProfilePictures.profile1],
  },
];

interface Props {}

const HomeScreen: FunctionComponent<Props> = () => {
  const [profiles, setProfiles] = useState(defaultProfiles);
  const handleSwiped = (liked: boolean) => {
    console.log('Liked :', liked);
    setProfiles((oldProfiles) => {
      const [, ...newProfiles] = oldProfiles;
      return newProfiles;
    });
  };

  const profilesAvailable = profiles.length > 0;

  return (
    <View style={styles.container}>
      {profilesAvailable ? (
        <>
          <CardSwiper {...{ profiles, handleSwiped }} />
          <View style={styles.footer}>
            <BottomButton
              color={colors.RED}
              icon="x"
              onPress={() => handleSwiped(false)}
            />
            <BottomButton
              color={colors.GREEN}
              icon="heart"
              onPress={() => handleSwiped(true)}
            />
          </View>
        </>
      ) : (
        <EmptyCard />
      )}
    </View>
  );
};

export default HomeScreen;
