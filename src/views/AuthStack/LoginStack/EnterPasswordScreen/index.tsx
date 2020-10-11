import React, { FunctionComponent, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { auth } from '@cocorico/services/firebase';
import FullScreenContainer from '@cocorico/components/FullScreenContainer';
import Title from '@cocorico/components/Texts/Title';
import CCRCTextInput from '@cocorico/components/Inputs/Text';
import CCRCButton from '@cocorico/components/Inputs/Button';
import { Roboto } from '@cocorico/constants/fonts';
import type { RootState } from '@cocorico/services/store';
import type { LoginStackParamList } from '@cocorico/components/Navigator/types';

interface Props extends StateProps {
  navigation: StackNavigationProp<LoginStackParamList, 'EnterPassword'>;
}

type State = string;

const EnterPasswordScreen: FunctionComponent<Props> = ({ email }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<State>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    try {
      if (email) {
        setLoading(true);
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setLoading(false);
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
        disabled={loading}
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
    fontFamily: Roboto[400],
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

export default connect(mapState, null)(EnterPasswordScreen);
