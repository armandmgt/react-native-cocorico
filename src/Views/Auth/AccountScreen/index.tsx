import React, { FunctionComponent, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import Title from '../../../Components/Texts/Title';
import CCRCTextInput from '../../../Components/Inputs/Text';
import CCRCButton from '../../../Components/Inputs/Button';
import FullScreenContainer from '../../../Components/FullScreenContainer';
import { RootState, Dispatch } from '../../../Services/Store';

import type { AuthStackParamList } from '../../../Components/Navigator';

const isValidEmail = (email: string) =>
  !!email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

const mapState = (state: RootState) => ({
  count: state.custom,
});
type StateProps = ReturnType<typeof mapState>;

const mapDispatch = (dispatch: Dispatch) => ({
  increment: () => dispatch.custom.increment(1),
  incrementAsync: () => dispatch.custom.incrementAsync(1),
});
type DispatchProps = ReturnType<typeof mapDispatch>;

interface Props extends StateProps, DispatchProps {
  navigation: StackNavigationProp<AuthStackParamList, 'Account'>;
}

interface State {
  email: string;
  dirty: boolean;
}

const AccountScreen: FunctionComponent<Props> = ({
  navigation,
  count,
  increment,
  incrementAsync,
}: Props) => {
  const [{ email, dirty }, setEmail] = useState<State>({
    email: '',
    dirty: false,
  });
  return (
    <FullScreenContainer>
      <View style={styles.content}>
        <Title>{`Cocoricooo ! ${count}`}</Title>
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
      <Button title="increment" onPress={() => increment()} />
      <Button title="incrementAsync" onPress={() => incrementAsync()} />
      <CCRCButton
        style={styles.button}
        title="Continuer"
        onPress={() => {
          if (isValidEmail(email))
            navigation.navigate('Login', { screen: 'EnterPassword' });
        }}
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

export default connect(mapState, mapDispatch)(AccountScreen);
