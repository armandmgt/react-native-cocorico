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
    params: { threads, me, onSend },
  } = route;
  const { id, name } = me;

  const formatMessages = () => {
    return threads.reverse().map((thread: any) => {
      return {
        _id: thread.id,
        text: thread.content,
        createdAt: new Date(),
        user: {
          _id: thread.senderId,
          name: thread.senderName,
        },
        sent: true,
        received: true,
      };
    });
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={formatMessages()}
        user={{ _id: id }}
        onSend={(mes) => {
          const { text, createdAt } = mes[0];
          onSend({
            content: text,
            senderId: id,
            senderName: name,
            createdAt,
          });
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default MessageScreen;
