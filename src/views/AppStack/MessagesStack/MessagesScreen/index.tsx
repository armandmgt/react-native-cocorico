import React, { useState } from 'react';
import { Pressable, FlatList } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import MessageItem from '@cocorico/components/MessageItem';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import colors from '@cocorico/constants/colors';

import styles from './styles';

const DATA: any = [
  {
    id: 'czo761978612oi8789h',
    title: 'Paulo le gigolo',
  },
  {
    id: 'czo761978789h',
    title: 'Michel la plus belle',
  },
  {
    id: 'czo8612oi8789h',
    title: 'Didier le cocotier',
  },
  {
    id: '61978612oi8789h',
    title: 'Louise la promise',
  },
  {
    id: 'czo761978612oi87',
    title: 'Marcus le gus',
  },
  {
    id: 'czo7',
    title: 'Ramirez chaud comme la braise',
  },
];

interface MessagesScreenProps {
  navigation: StackNavigationProp<TypedNavigatorParams<'MessagesNavigator'>>;
}

const MessagesScreen = ({ navigation }: MessagesScreenProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const renderConversations = ({ item }: any) => {
    const selected = item.id === selectedId;

    return (
      <Pressable
        // style={selected && { backgroundColor: colors.GREY_ACCENT }}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate('Message');
        }}
      >
        <MessageItem title={item.title} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={DATA}
      keyExtractor={(item: any) => item.id}
      renderItem={renderConversations}
      style={styles.container}
    />
  );
};

export default MessagesScreen;
