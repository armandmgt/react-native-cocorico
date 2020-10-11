import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { firestore } from '@cocorico/services/firebase';
import Title from '@cocorico/components/Texts/Title';
import CCRCTextInput from '@cocorico/components/Inputs/Text';
import CCRCButton from '@cocorico/components/Inputs/Button';
import FullScreenContainer from '@cocorico/components/FullScreenContainer';
import { Roboto } from '@cocorico/constants/fonts';
import type { Dispatch } from '@cocorico/services/store';
import type { AuthStackParamList } from '@cocorico/components/Navigator/types';

const isValidEmail = (email: string) =>
  !!email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

interface Props extends DispatchProps {
  navigation: StackNavigationProp<AuthStackParamList, 'Account'>;
}

interface State {
  email: string;
  dirty: boolean;
}

const AccountScreen: FunctionComponent<Props> = ({
  navigation,
  storeEmail,
}: Props) => {
  const [{ email, dirty }, setEmail] = useState<State>({
    email: '',
    dirty: false,
  });

  const handleSubmit = async () => {
    if (isValidEmail(email)) {
      try {
        storeEmail(email);
        const doc = await firestore.collection('users').doc(email).get();
        if (doc.exists) {
          navigation.navigate('Login', { screen: 'EnterPassword' });
        } else {
          navigation.navigate('Register', { screen: 'CreateProfile' });
        }
      } catch (err) {
        // Show error somehow
      }
    }
  };

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
          autoCompleteType="email"
          autoCapitalize="none"
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

const mapDispatch = (dispatch: Dispatch) => ({
  storeEmail: (email: string) => dispatch.auth.setEmail(email),
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(null, mapDispatch)(AccountScreen);
