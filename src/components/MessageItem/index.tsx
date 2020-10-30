import React from 'react';
import { View, Text } from 'react-native';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import colors from '@cocorico/constants/colors';

import styles from './styles';

interface MessageItemProps {
  title: string;
}

const MessageItem = ({ title }: MessageItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <FontAwesomeIcon color={colors.GREY} icon={faUserCircle} size={40} />
      </View>
      <View style={styles.details}>
        <Text allowFontScaling={false} style={styles.title}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(MessageItem);
