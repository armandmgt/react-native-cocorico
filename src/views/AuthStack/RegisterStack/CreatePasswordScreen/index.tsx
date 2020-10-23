import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';

import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import FullScreenContainer from '@cocorico/components/FullScreenContainer';
import type { RegisterStackParamList } from '@cocorico/components/Navigator/types';
import Title from '@cocorico/components/Texts/Title';

import type { Dispatch } from '@cocorico/services/store';

import { Roboto } from '@cocorico/constants/fonts';

interface Props extends DispatchProps {
  navigation: StackNavigationProp<RegisterStackParamList, 'CreatePassword'>;
}

type State = string;

const CreatePasswordScreen: FunctionComponent<Props> = ({
  createUser,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<State>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    try {
      if (password) {
        setLoading(true);
        createUser({ password });
      }
    } catch (err) {
      setLoading(false);
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
  title: {
    fontSize: 46,
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

const mapDispatch = ({ profile: { createUser } }: Dispatch) => ({
  createUser,
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(null, mapDispatch)(CreatePasswordScreen);
