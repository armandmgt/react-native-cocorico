import React, { FunctionComponent, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  ViewProps,
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';

import { RootState, Dispatch } from '@cocorico/services/store';

interface StyleProps {
  container: ViewProps;
}
const styles = StyleSheet.create<StyleProps>({
  container: {
    flex: 1,
  },
});

interface MessageScreenProps extends StateProps, DispatchProps {
  route: any;
}

const MessageScreen: FunctionComponent<MessageScreenProps> = ({
  route,
  userInfo,
  listMessages,
  sendMessage,
}) => {
  const {
    params: { convRef },
  } = route;

  if (!userInfo?.id || !userInfo.firstName) return null;

  const formatMessages = () => {
    const conv = listMessages.find((elem) => elem.ref === convRef).threads;

    return conv.reverse().map((thread: any, key: number) => {
      return {
        _id: `${convRef}${key}`,
        text: thread.content,
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
        user={{ _id: userInfo.id }}
        onSend={(mes) => {
          const { text, createdAt } = mes[0];
          sendMessage({
            ref: convRef,
            newMessage: {
              content: text,
              senderId: userInfo.id,
              senderName: userInfo.firstName,
              createdAt,
            },
          });
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

const mapState = (state: RootState) => ({
  userInfo: state.auth.user,
  listMessages: state.messages.conversations,
});
type StateProps = ReturnType<typeof mapState>;

const mapDispatch = (dispatch: Dispatch) => ({
  sendMessage: dispatch.firestore.sendMessage,
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(MessageScreen);
