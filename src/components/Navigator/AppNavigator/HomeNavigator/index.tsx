import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import DetailsScreen from '@cocorico/views/AppStack/HomeStack/DetailsScreen';
import HomeScreen from '@cocorico/views/AppStack/HomeStack/HomeScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

const HomeStackNavigator = () => {
  const HomeStack = createStackNavigator<
    TypedNavigatorParams<'HomeNavigator'>
  >();

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen component={HomeScreen} name="Home" />
      <HomeStack.Screen component={DetailsScreen} name="Details" />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
