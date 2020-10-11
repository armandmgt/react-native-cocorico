import React, { FunctionComponent, useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { auth } from 'firebase';

import FullScreenContainer from '@cocorico/components/FullScreenContainer';
import Title from '@cocorico/components/Texts/Title';
import CCRCTextInput from '@cocorico/components/Inputs/Text';
import CCRCButton from '@cocorico/components/Inputs/Button';
import type { Dispatch, RootState } from '@cocorico/services/store';
import type { LoginStackParamList } from '@cocorico/components/Navigator/types';

interface Props extends StateProps, DispatchProps {
  navigation: StackNavigationProp<LoginStackParamList, 'EnterPassword'>;
}

type State = string;

const EnterPasswordScreen: FunctionComponent<Props> = ({
  email,
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
      if (email) await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FullScreenContainer>
      <View style={styles.content}>
        <Title>C&apos;est chouette de vous revoir.</Title>
        <Text style={styles.helperText}>
          Renseignez votre mot de passe afin de vous connecter.
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
          textContentType="password"
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

const mapState = (state: RootState) => ({
  email: state.auth.email,
});
type StateProps = ReturnType<typeof mapState>;

const mapDispatch = (dispatch: Dispatch) => ({
  setLoggedIn: () => dispatch.auth.setStatus('LOGGED_IN'),
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(EnterPasswordScreen);
