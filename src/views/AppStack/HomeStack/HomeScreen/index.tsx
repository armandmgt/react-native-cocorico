import React, { FunctionComponent, useState } from 'react';
import { View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import CardSwiper from '@cocorico/components/CardSwiper';
import CCRCButton from '@cocorico/components/CCRC/Button';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import ProfilePictures from '@cocorico/assets/images/profiles';

import styles from './index.styles';
import type { Profile } from './Profile';
import Profiles from './Profiles';

const defaultProfiles: Profile[] = [
  {
    id: '1',
    name: 'Caroline',
    age: 24,
    profile: ProfilePictures.profile1,
  },
  {
    id: '2',
    name: 'Jack',
    age: 30,
    profile: ProfilePictures.profile2,
  },
  {
    id: '3',
    name: 'Anet',
    age: 21,
    profile: ProfilePictures.profile3,
  },
  {
    id: '4',
    name: 'John',
    age: 28,
    profile: ProfilePictures.profile4,
  },
];

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'HomeNavigator'>>;
}

const HomeScreen: FunctionComponent<Props> = ({ navigation }) => {
  const [profiles, setProfiles] = useState(defaultProfiles);
  const handleSwiped = (liked) => {
    console.log('Liked :', liked);
    setProfiles((oldProfiles) => {
      const [_, ...newProfiles] = oldProfiles;
      return newProfiles;
    });
  };

  console.log('Profiles :', profiles);

  return (
    <View style={styles.container}>
      {/* <Profiles {...{ profiles }} /> */}
      <CardSwiper {...{ profiles, handleSwiped }} />
      {/* <CCRCButton title="details" onPress={() => navigation.push('Details')} /> */}
    </View>
  );
};

export default HomeScreen;
