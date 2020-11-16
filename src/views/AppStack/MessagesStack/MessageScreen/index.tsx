import React, { FunctionComponent } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  ViewProps,
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

interface StyleProps {
  container: ViewProps;
}
const styles = StyleSheet.create<StyleProps>({
  container: {
    flex: 1,
  },
});

interface MessageScreenProps {
  route: any;
}

const MessageScreen: FunctionComponent<MessageScreenProps> = ({ route }) => {
  const {
    params: { threads, me },
  } = route;

  const formatMessages = () => {
    return threads.reverse().map((thread: any, key: number) => {
      return {
        _id: key + thread.senderId,
        text: thread.content,
        createdAt: new Date(),
        user: {
          _id: thread.senderId,
          name: thread.senderName,
        },
      };
    });
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={formatMessages()}
        user={{ _id: me }}
        onSend={() => {}}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default MessageScreen;
