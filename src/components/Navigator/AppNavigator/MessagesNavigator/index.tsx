import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MessageScreen from '@cocorico/views/AppStack/MessagesStack/MessageScreen';
import MessagesScreen from '@cocorico/views/AppStack/MessagesStack/MessagesScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

const MessagesStackNavigator = () => {
  const MessagesStack = createStackNavigator<
    TypedNavigatorParams<'MessagesNavigator'>
  >();

  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen component={MessagesScreen} name="Messages" />
      <MessagesStack.Screen component={MessageScreen} name="Message" />
    </MessagesStack.Navigator>
  );
};

export default MessagesStackNavigator;
