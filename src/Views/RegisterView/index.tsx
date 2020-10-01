import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileView from './ProfileView';
import EmailView from './EmailView';
import PasswordView from './PasswordView';

type RegisterStep = 'email' | 'password' | 'profile';

const steps = {
  email: EmailView,
  password: PasswordView,
  profile: ProfileView
};

const Register = () => {
  const [step, setStep] = useState<RegisterStep>('email');
  const CurrentView = steps[step];
  return (
    <View>
      <CurrentView />
    </View>
  );
};

export default Register;
