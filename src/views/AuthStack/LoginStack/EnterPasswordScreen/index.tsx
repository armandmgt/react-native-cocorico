import React, { FunctionComponent, useState } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCTextButton from '@cocorico/components/CCRC/TextButton';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase from '@cocorico/services/firebase';
import { useValues } from '@cocorico/services/utils/hooks';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'LoginNavigator'>>;
  route: RouteProp<TypedNavigatorParams<'LoginNavigator'>, 'EnterPassword'>;
}

const EnterPasswordScreen: FunctionComponent<Props> = ({
  navigation,
  route: {
    params: { email },
  },
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [{ password }, updateValue] = useValues<{
    password: string;
  }>({
    password: '',
  });

  const handleTextChange = (value: string) => {
    setError('');
    updateValue('password')(value);
  };

  const handleForgotPassword = () => {
    navigation.push('ForgotPassword', { email });
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);

    const result = await Firebase.login(email, password);

    if (!result.success) {
      if (result.error?.message) setError(result.error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.text, { ...spacing.mgb1 }]}>
          C&apos;est chouette de vous revoir
          <Text style={styles.coloredText}>.</Text>
        </Text>
        <Text style={[styles.helperText, { ...spacing.mgb4 }]}>
          Renseignez votre mot de passe afin de vous connecter.
        </Text>
        <CCRCTextInput
          outline
          valid={!error}
          error={error}
          autoFocus
          value={password}
          secureTextEntry
          onChangeText={handleTextChange}
          placeholder="Votre mot de passe"
          keyboardType="default"
          textContentType="password"
          autoCompleteType="password"
          returnKeyType="next"
          onSubmitEditing={handleSubmit}
        />
      </View>
      <CCRCTextButton
        style={{ ...spacing.mgb2 }}
        title="Mot de passe oublié ?"
        onPress={handleForgotPassword}
      />
      <CCRCButton
        variant="gradient"
        disabled={loading}
        style={{ ...spacing.mgb4 }}
        title="Connexion"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default EnterPasswordScreen;
