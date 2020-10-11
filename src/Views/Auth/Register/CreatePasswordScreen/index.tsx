import React, { FunctionComponent, useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { auth } from 'firebase';

import FullScreenContainer from '@cocorico/Components/FullScreenContainer';
import Title from '@cocorico/Components/Texts/Title';
import CCRCTextInput from '@cocorico/Components/Inputs/Text';
import CCRCButton from '@cocorico/Components/Inputs/Button';
import type { Dispatch } from '@cocorico/Services/Store';
import type { LoginStackParamList } from '@cocorico/Components/Navigator/types';

interface Props extends DispatchProps {
  navigation: StackNavigationProp<LoginStackParamList, 'EnterPassword'>;
}

type State = string;

const CreatePasswordScreen: FunctionComponent<Props> = ({
  createUser,
  setLoggedIn,
}: Props) => {
  const [password, setPassword] = useState<State>('');
  const [error, setError] = useState<string>('');

  const handleAuthentication = useCallback(() => {
    setLoggedIn();
  }, [setLoggedIn]);

  auth().onAuthStateChanged(handleAuthentication);

  const handleSubmit = async () => {
    try {
      if (password) {
        createUser({ password });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FullScreenContainer>
      <View style={styles.content}>
        <Title style={styles.title}>Hop ! Plus qu&apos;un mot de passe.</Title>
        <Text style={styles.helperText}>
          Renseignez un mot de passe afin de créer votre compte.
        </Text>
        <CCRCTextInput
          outline
          style={styles.input}
          autoFocus
          value={password}
          secureTextEntry
          onChangeText={(value: string) => {
            setPassword(value);
          }}
          placeholder="Votre mot de passe"
          keyboardType="default"
          textContentType="newPassword"
          autoCompleteType="password"
        />
        <Text>{error}</Text>
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
  title: {
    fontSize: 46,
  },
  helperText: {
    fontFamily: 'Roboto',
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

const mapDispatch = ({
  profile: { createUser },
  auth: { setStatus },
}: Dispatch) => ({
  createUser,
  setLoggedIn: () => setStatus('LOGGED_IN'),
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(null, mapDispatch)(CreatePasswordScreen);
