import React from 'react';

import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  StackNavigationOptions,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import ProfileScreen from '@cocorico/views/AppStack/ProfileStack/ProfileScreen';
import SettingsScreen from '@cocorico/views/AppStack/ProfileStack/SettingsScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import colors from '@cocorico/constants/colors';

import { HeaderHome, HeaderBack, HeaderSettings } from '../headerButtons';
import { fromLeft, fromBottom } from '../transitions';

interface NavigationRoute {
  navigation: StackNavigationProp<
    TypedNavigatorParams<'AppNavigator' | 'ProfileNavigator'>
  >;
  route: RouteProp<Record<string, object | undefined>, string>;
}

export const getProfileStackOptions = (): StackNavigationOptions => {
  return {
    headerStyle: {
      backgroundColor: colors.WHITE_ACCENT,
    },
    headerTitleStyle: {
      fontSize: 18,
      color: colors.BLACK,
    },
    headerTitleAlign: 'center',
    ...fromLeft,
  };
};

const getProfileScreenOptions = ({
  navigation,
}: NavigationRoute): StackNavigationOptions => ({
  title: 'Profile',
  headerLeft: () => (
    <HeaderSettings
      side="left"
      onPress={() => {
        navigation.push('Settings');
      }}
    />
  ),
  headerRight: () => (
    <HeaderHome
      direction="right"
      side="right"
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
});

const getSettingsScreenOptions = ({
  navigation,
}: NavigationRoute): StackNavigationOptions => ({
  title: 'Settings',
  headerLeft: () => null,
  headerRight: () => (
    <HeaderBack
      side="right"
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
  ...fromBottom,
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
});

const ProfileStackNavigator = () => {
  const ProfileStack = createStackNavigator<
    TypedNavigatorParams<'ProfileNavigator'>
  >();

  return (
    <ProfileStack.Navigator screenOptions={getProfileStackOptions}>
      <ProfileStack.Screen
        component={ProfileScreen}
        name="Profile"
        options={getProfileScreenOptions}
      />
      <ProfileStack.Screen
        component={SettingsScreen}
        name="Settings"
        options={getSettingsScreenOptions}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
