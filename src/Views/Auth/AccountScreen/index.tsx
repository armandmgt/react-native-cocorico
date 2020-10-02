import React, { FunctionComponent, useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import Title from '../../../Components/Texts/Title';
import CCRCTextInput from '../../../Components/Inputs/Text';
import CCRCButton from '../../../Components/Inputs/Button';
import FullScreenContainer from '../../../Components/FullScreenContainer';

import type { AuthStackParamList } from '../../../Components/Navigator';

const isValidEmail = (email: string) =>
  !!email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, 'Account'>;
}

interface State {
  email: string;
  dirty: boolean;
}

const AccountScreen: FunctionComponent<Props> = ({ navigation }: Props) => {
  const [{ email, dirty }, setEmail] = useState<State>({
    email: '',
    dirty: false,
  });

  const handleSubmit = useCallback(async () => {
    if (isValidEmail(email)) {
      try {
        const doc = await firestore().collection('users').doc(email).get();
        if (doc.exists) {
          navigation.navigate('Login', { screen: 'EnterPassword' });
        } else {
          navigation.navigate('Register', { screen: 'CreateProfile' });
        }
      } catch (err) {
        // Show error somehow
      }
    }
  }, [navigation, email]);

  return (
    <FullScreenContainer>
      <View style={styles.content}>
        <Title>Cocoricooo !</Title>
        <Text style={styles.helperText}>
          Pour commencer, entrez votre adresse email.
        </Text>
        <CCRCTextInput
          outline
          style={styles.input}
          valid={dirty ? isValidEmail(email) : undefined}
          value={email}
          onChangeText={(value: string) => {
            setEmail({ email: value, dirty: true });
          }}
          placeholder="Adresse email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
      </View>
      <CCRCButton
        style={styles.button}
        title="Continuer"
        onPress={handleSubmit}
      />
    </FullScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
  },
  helperText: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    marginBottom: 32,
  },
  input: {
    height: 66,
  },
  button: {
    marginVertical: 40,
  },
});

export default AccountScreen;
