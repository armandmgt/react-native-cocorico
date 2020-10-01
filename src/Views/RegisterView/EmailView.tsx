import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Title from '../../Components/Texts/Title';
import CCRCTextInput from '../../Components/Inputs/Text';
import CCRCButton from '../../Components/Inputs/Button';

const isValidEmail = (email: string) =>
  !!email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

const EmailView = () => {
  const [{ email, dirty }, setEmail] = useState<{
    email: string;
    dirty: boolean;
  }>({ email: '', dirty: false });
  return (
    <View style={styles.root}>
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
          onChangeText={(value) => setEmail({ email: value, dirty: true })}
          placeholder="Adresse email"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
      </View>
      <CCRCButton style={styles.button} title="Continuer" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
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

export default EmailView;
