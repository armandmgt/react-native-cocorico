import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';

import MessageItem from '@cocorico/components/MessageItem';

import styles from './styles';

const DATA: any = [
  {
    id: 'czo761978612oi8789h',
    title: 'Messages with Paulo le gigolo',
  },
  {
    id: 'czo761978789h',
    title: 'Messages with Michel la plus belle',
  },
  {
    id: 'czo8612oi8789h',
    title: 'Messages with Didier le cocotier',
  },
  {
    id: '61978612oi8789h',
    title: 'Messages with Louise la promise',
  },
  {
    id: 'czo761978612oi87',
    title: 'Messages with Marcus le gus',
  },
  {
    id: 'czo7',
    title: 'Messages with Ramirez chaud comme la braise',
  },
];

const MessagesScreen = () => {
  const renderConversations = ({ item }: any) => (
    <MessageItem title={item.title} />
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderConversations}
      keyExtractor={(item: any) => item.id}
      style={styles.container}
    />
  );
};

export type MessageStackParamList = {
  Messages: undefined;
};

const MessageStackNavigator = () => {
  const MessageStack = createStackNavigator<MessageStackParamList>();

  return (
    <MessageStack.Navigator>
      <MessageStack.Screen name="Messages" component={MessagesScreen} />
    </MessageStack.Navigator>
  );
};

export default MessageStackNavigator;
