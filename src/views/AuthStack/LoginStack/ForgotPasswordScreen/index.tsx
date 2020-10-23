import React, { FunctionComponent } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase from '@cocorico/services/firebase';
import { isValidEmail } from '@cocorico/services/utils';
import { useValues } from '@cocorico/services/utils/hooks';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'LoginNavigator'>>;
  route: RouteProp<TypedNavigatorParams<'LoginNavigator'>, 'ForgotPassword'>;
}

const ForgotPasswordScreen: FunctionComponent<Props> = ({
  navigation,
  route: {
    params: { email: defaultEmail },
  },
}: Props) => {
  const [{ email }, updateValue] = useValues<{
    email: string;
  }>({
    email: defaultEmail,
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!isValidEmail(email)) return;

    await Firebase.askResetPassword(email);
    navigation.push('ForgotPasswordConfirmation', { email });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.text, { ...spacing.mgb1 }]}>
          Ça arrive a tout le monde
          <Text style={styles.coloredText}>.</Text>
        </Text>
        <Text style={[styles.helperText, { ...spacing.mgb4 }]}>
          Vérifiez l&apos;adresse mail à laquelle nous allons vous envoyer un
          lien de réinitialisation de votre mot de passe
        </Text>
        <CCRCTextInput
          outline
          valid={!email || isValidEmail(email)}
          value={email}
          onChangeText={updateValue('email')}
          placeholder="Adresse email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCompleteType="email"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={handleSubmit}
        />
      </View>
      <CCRCButton
        variant="gradient"
        disabled={!isValidEmail(email)}
        style={{ ...spacing.mgb2 }}
        title="Confirmer l'adresse email"
        onPress={handleSubmit}
      />
      <CCRCButton
        variant="outline"
        style={{ ...spacing.mgb4 }}
        title="Retour"
        onPress={handleGoBack}
      />
    </View>
  );
};

export default ForgotPasswordScreen;
