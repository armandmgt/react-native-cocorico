import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

interface MessageItemProps {
  title: string;
}

const MessageItem: FunctionComponent<MessageItemProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default React.memo(MessageItem);
