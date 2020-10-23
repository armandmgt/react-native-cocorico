import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '@cocorico/views/AppStack/ProfileStack/ProfileScreen';
import SettingsScreen from '@cocorico/views/AppStack/ProfileStack/SettingsScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

const ProfileStackNavigator = () => {
  const ProfileStack = createStackNavigator<
    TypedNavigatorParams<'ProfileNavigator'>
  >();

  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: true }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;
