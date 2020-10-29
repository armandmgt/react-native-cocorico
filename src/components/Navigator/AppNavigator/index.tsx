import React from 'react';

import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import MailboxScreen from '@cocorico/views/AppStack/MailboxScreen';

import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import { HeaderTitle, HeaderMailbox, HeaderProfile } from './headerButtons';
import HomeStackNavigator from './HomeNavigator';
import ProfileStackNavigator from './ProfileNavigator';

const getAppStackScreenOptions = ({
  navigation,
}: {
  navigation: StackNavigationProp<TypedNavigatorParams<'AppNavigator'>>;
}): StackNavigationOptions => ({
  title: 'Cocorico',
  headerTitle: (props) => <HeaderTitle navigation={navigation} {...props} />,
  headerLeft: (props) => <HeaderProfile navigation={navigation} {...props} />,
  headerRight: (props) => <HeaderMailbox navigation={navigation} {...props} />,
  headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
});

const AppStackNavigator = () => {
  const AppStack = createStackNavigator<TypedNavigatorParams<'AppNavigator'>>();

  return (
    <AppStack.Navigator screenOptions={getAppStackScreenOptions}>
      <AppStack.Screen component={HomeStackNavigator} name="HomeNavigator" />
      <AppStack.Screen component={MailboxScreen} name="Mailbox" />
      <AppStack.Screen
        component={ProfileStackNavigator}
        name="ProfileNavigator"
        options={{
          gestureDirection: 'horizontal-inverted',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
