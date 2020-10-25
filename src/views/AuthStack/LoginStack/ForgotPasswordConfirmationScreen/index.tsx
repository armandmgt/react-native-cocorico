import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import AuthContainer from '@cocorico/components/AuthContainer';
import CCRCButton from '@cocorico/components/CCRC/Button';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'LoginNavigator'>>;
  route: RouteProp<
    TypedNavigatorParams<'LoginNavigator'>,
    'ForgotPasswordConfirmation'
  >;
}

const ForgotPasswordConfirmationScreen: FunctionComponent<Props> = ({
  navigation,
  route: {
    params: { email },
  },
}: Props) => {
  const handleConfirm = () => {
    navigation.navigate('EnterPassword', { email });
  };

  return (
    <AuthContainer>
      <View style={styles.content}>
        <Text style={[styles.text, { ...spacing.mgb1 }]}>
          La suite se passe par email
          <Text style={styles.coloredText}>.</Text>
        </Text>
        <Text style={styles.helperText}>
          {"Vous allez recevoir un lien de réinitialisation à l'adresse "}
          <Text style={[styles.helperText, styles.helperTextEmail]}>
            {email}
          </Text>
          <Text style={[styles.helperText, { ...spacing.mgl1 }]}>
            {" s'il s'agit d'une adresse mail valide."}
          </Text>
        </Text>
      </View>
      <CCRCButton
        style={{ ...spacing.mgb4 }}
        title="Retour à la connexion"
        variant="gradient"
        onPress={handleConfirm}
      />
    </AuthContainer>
  );
};

export default ForgotPasswordConfirmationScreen;
