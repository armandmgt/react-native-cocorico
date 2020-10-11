import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreatePasswordScreen from '@cocorico/views/AuthStack/RegisterStack/CreatePasswordScreen';
import CreateProfileScreen from '@cocorico/views/AuthStack/RegisterStack/CreateProfileScreen';

export type RegisterStackParamList = {
  CreatePassword: undefined;
  CreateProfile: undefined;
};

const RegisterStackNavigator = () => {
  const RegisterStack = createStackNavigator<RegisterStackParamList>();

  return (
    <RegisterStack.Navigator initialRouteName="CreateProfile">
      <RegisterStack.Screen
        name="CreatePassword"
        options={{ headerShown: false }}
        component={CreatePasswordScreen}
      />
      <RegisterStack.Screen
        name="CreateProfile"
        options={{ headerShown: false }}
        component={CreateProfileScreen}
      />
    </RegisterStack.Navigator>
  );
};

export default RegisterStackNavigator;
