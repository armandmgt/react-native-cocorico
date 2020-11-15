import React, { FunctionComponent } from 'react';
import { Image, View, TouchableNativeFeedback } from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';

import DefaultProfileImage from '@cocorico/assets/images/default-profile-image.jpg';

import styles from './ProfileImage.styles';

interface Props {
  profilePic?: string;
  onPress: () => any;
}

const ProfileImage: FunctionComponent<Props> = ({ profilePic, onPress }) => {
  return (
    <View style={styles.panel}>
      <View
        style={[styles.imageView, profilePic ? styles.elevatedStyles : null]}
      >
        <Image source={DefaultProfileImage} style={styles.image} />
        {profilePic && (
          <Image
            source={{ uri: profilePic }}
            style={[styles.image, styles.overlapImage]}
          />
        )}
        <View style={styles.chooseImageButtonView}>
          <View style={styles.chooseImageButton}>
            <TouchableNativeFeedback onPress={onPress}>
              <Icon name="edit-2" size={24} />
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileImage;
