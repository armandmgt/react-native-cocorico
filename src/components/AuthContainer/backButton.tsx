import React, { FunctionComponent } from 'react';
import { TextStyle } from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import colors from '@cocorico/constants/colors';

import styles from './backButton.styles';

interface Props {
  style?: TextStyle;
}

const BackButton: FunctionComponent<Props> = ({ style }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <Icon
      color={colors.BLACK}
      name="chevron-left"
      size={35}
      style={[styles.icon, style]}
      onPress={handlePress}
    />
  );
};

export default BackButton;
