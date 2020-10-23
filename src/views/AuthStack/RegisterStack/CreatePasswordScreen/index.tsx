import React, { FunctionComponent, useState } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import { isValidPassword } from '@cocorico/services/utils';
import { useValues } from '@cocorico/services/utils/hooks';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'RegisterNavigator'>>;
  route: RouteProp<TypedNavigatorParams<'RegisterNavigator'>, 'CreatePassword'>;
}

const CreatePasswordScreen: FunctionComponent<Props> = ({
  navigation,
  route: {
    params: { email },
  },
}: Props) => {
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

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!canSubmit) return;

    navigation.push('CreateAccount', { email, password });
  };

  const canSubmit = !!password && isValidPassword(password);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.text, { ...spacing.mgb1 }]}>
          C&apos;est votre première fois ici
          <Text style={styles.coloredText}>.</Text>
        </Text>
        <Text style={[styles.helperText, { ...spacing.mgb4 }]}>
          Veuillez chosisir le mot de passe qui vous permettra de vous
          connecter.
        </Text>
        <CCRCTextInput
          outline
          valid={!error && (!password || canSubmit)}
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
      <CCRCButton
        variant="gradient"
        disabled={!canSubmit}
        style={{ ...spacing.mgb4 }}
        title="Choisir le mot de passe"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default CreatePasswordScreen;
