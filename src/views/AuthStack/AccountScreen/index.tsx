import React, { FunctionComponent } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';

import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import CCRCExpandedText from '@cocorico/components/ExpandedText';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase from '@cocorico/services/firebase';
import { isValidEmail } from '@cocorico/services/utils';
import { useValues } from '@cocorico/services/utils/hooks';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'AuthNavigator'>>;
}

const AccountScreen: FunctionComponent<Props> = ({ navigation }: Props) => {
  const [{ email }, updateValue] = useValues<{
    email: string;
  }>({
    email: 'maxime.blanchard2@free.fr',
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!isValidEmail(email)) return;

    const userDoesExist = await Firebase.doesUserExist(email);

    if (userDoesExist) {
      navigation.navigate('LoginNavigator', {
        screen: 'EnterPassword',
        params: { email },
      });
    } else {
      navigation.navigate('RegisterNavigator', {
        screen: 'CreateProfile',
        params: { email },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Bienvenue</Text>
        <View style={styles.titleContainer}>
          <Text style={[styles.text, { ...spacing.pgr1 }]}>sur</Text>
          <CCRCExpandedText
            start="Cocoric"
            fill="o"
            end="o"
            characterWidth={27}
            style={[styles.textImpact, { ...spacing.pgr1 }]}
            after={
              <Text style={[styles.textImpact, styles.coloredText]}>!</Text>
            }
          />
        </View>
        <Text style={[styles.helperText, { ...spacing.mgb4 }]}>
          Pour commencer, entrez votre adresse email.
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
        style={styles.button}
        title="Continuer"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default AccountScreen;
