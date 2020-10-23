import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import DetailsScreen from '@cocorico/views/AppStack/HomeStack/DetailsScreen';
import HomeScreen from '@cocorico/views/AppStack/HomeStack/HomeScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

const LoginStackNavigator = () => {
  const LoginStack = createStackNavigator<
    TypedNavigatorParams<'HomeNavigator'>
  >();

  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Home" component={HomeScreen} />
      <LoginStack.Screen name="Details" component={DetailsScreen} />
    </LoginStack.Navigator>
  );
};

export default LoginStackNavigator;
