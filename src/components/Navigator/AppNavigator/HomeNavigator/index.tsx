import React from 'react';

import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';

import DetailsScreen from '@cocorico/views/AppStack/HomeStack/DetailsScreen';
import HomeScreen from '@cocorico/views/AppStack/HomeStack/HomeScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import colors from '@cocorico/constants/colors';

import { HeaderTitle, HeaderProfile, HeaderMailbox } from '../headerButtons';
import { fromBottom } from '../transitions';

interface NavigationRoute {
  navigation: StackNavigationProp<
    TypedNavigatorParams<'AppNavigator' | 'HomeNavigator'>
  >;
  route: RouteProp<Record<string, object | undefined>, string>;
}

export const getHomeStackOptions = ({
  navigation,
}: NavigationRoute): StackNavigationOptions => {
  return {
    headerStyle: {
      backgroundColor: colors.WHITE_ACCENT,
    },
    headerTitleAlign: 'center',
    title: 'Cocorico',
    headerTitle: (props) => (
      <HeaderTitle {...props} onPress={() => navigation.navigate('Home')} />
    ),
    headerLeft: () => (
      <HeaderProfile
        side="left"
        onPress={() => {
          navigation.navigate('ProfileNavigator', { screen: 'Profile' });
        }}
      />
    ),
    headerRight: () => (
      <HeaderMailbox
        side="right"
        onPress={() => {
          navigation.navigate('MessagesNavigator', { screen: 'Messages' });
        }}
      />
    ),
    headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
  };
};

const getHomeScreenOptions = (): StackNavigationOptions => ({});

const getDetailsScreenOptions = (): StackNavigationOptions => ({
  ...fromBottom,
});

const HomeStackNavigator = () => {
  const HomeStack = createStackNavigator<
    TypedNavigatorParams<'HomeNavigator'>
  >();

  return (
    <HomeStack.Navigator screenOptions={getHomeStackOptions}>
      <HomeStack.Screen
        component={HomeScreen}
        name="Home"
        options={getHomeScreenOptions}
      />
      <HomeStack.Screen
        component={DetailsScreen}
        name="Details"
        options={getDetailsScreenOptions}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
