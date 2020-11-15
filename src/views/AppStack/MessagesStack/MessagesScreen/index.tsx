import React, { useEffect } from 'react';
import { Pressable, FlatList } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';

import MessageItem from '@cocorico/components/MessageItem';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import { RootState, Dispatch } from '@cocorico/services/store';

import NoMessage from './NoMessageScreen';
import styles from './styles';

interface MessagesScreenProps extends StateProps, DispatchProps {
  navigation: StackNavigationProp<TypedNavigatorParams<'MessagesNavigator'>>;
}

const MessagesScreen = ({
  myFirstName,
  myLastName,
  navigation,
  messagesFetched,
  messages,
  getMessages,
}: MessagesScreenProps) => {
  const getConv = async () => {
    await getMessages();
  };

  useEffect(() => {
    if (!messagesFetched) getConv();
  });

  const renderConversations = ({ item }: any) => {
    const {
      lastMessage: { content },
      participants,
      threads,
    } = item;

    const { id } = participants.find(
      (user: any) =>
        myFirstName === user.firstName && myLastName === user.lastName,
    );

    const { firstName, lastName } = participants.find(
      (user: any) =>
        myFirstName !== user.firstName && myLastName !== user.lastName,
    );

    const handleRedirection = () => {
      navigation.navigate('Message', { threads, me: id });
    };

    return (
      <Pressable onPress={handleRedirection}>
        <MessageItem subtitle={content} title={`${firstName} ${lastName}`} />
      </Pressable>
    );
  };

  if (!messages || !messages.length)
    return <NoMessage refresh={getConv} refreshing={messagesFetched} />;

  return (
    <FlatList
      data={messages}
      keyExtractor={(item: any) => item.lastMessage.id}
      refreshing={!messagesFetched}
      renderItem={renderConversations}
      style={styles.container}
      onRefresh={getConv}
    />
  );
};

const mapState = (state: RootState) => ({
  myFirstName: state.auth.user?.firstName,
  myLastName: state.auth.user?.lastName,
  messagesFetched: state.messages.fetched,
  messages: state.messages.conversations,
});
type StateProps = ReturnType<typeof mapState>;

const mapDispatch = (dispatch: Dispatch) => ({
  getMessages: dispatch.firestore.getMessages,
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(MessagesScreen);
