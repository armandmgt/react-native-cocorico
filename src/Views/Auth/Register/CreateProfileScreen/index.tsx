import React, { FunctionComponent, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import Title from '@cocorico/Components/Texts/Title';
import CCRCTextInput from '@cocorico/Components/Inputs/Text';
import CCRCButton from '@cocorico/Components/Inputs/Button';
import FullScreenContainer from '@cocorico/Components/FullScreenContainer';
import type { Dispatch } from '@cocorico/Services/Store';
import type { AuthStackParamList } from '@cocorico/Components/Navigator/types';

const isValidName = (name: string) =>
  !!name.match(/^([A-zÀ-ú]+-?)+([A-zÀ-ú]+)$/);

interface Props extends DispatchProps {
  navigation: StackNavigationProp<AuthStackParamList, 'Account'>;
}

interface State {
  firstname: string;
  firstnameDirty: boolean;
  lastname: string;
  lastnameDirty: boolean;
}

const CreateProfileScreen: FunctionComponent<Props> = ({
  navigation,
  setNames,
}: Props) => {
  const [
    { firstname, firstnameDirty, lastname, lastnameDirty },
    setValues,
  ] = useState<State>({
    firstname: '',
    firstnameDirty: false,
    lastname: '',
    lastnameDirty: false,
  });

  const handleSubmit = async () => {
    if (isValidName(firstname) && isValidName(lastname)) {
      try {
        setNames({ firstname, lastname });
        navigation.navigate('Register', { screen: 'CreatePassword' });
      } catch (err) {
        // Show error somehow
      }
    }
  };

  return (
    <FullScreenContainer>
      <View style={styles.content}>
        <Title style={styles.title}>Commencons par les presentations...</Title>
        <Text style={styles.helperText}>C&apos;est quoi votre petit nom ?</Text>
        <CCRCTextInput
          style={styles.input}
          valid={firstnameDirty ? isValidName(firstname) : undefined}
          value={firstname}
          onChangeText={(value: string) => {
            setValues({
              firstname: value,
              firstnameDirty: true,
              lastname,
              lastnameDirty,
            });
          }}
          placeholder="Prénom"
          keyboardType="default"
          textContentType="name"
          autoCompleteType="name"
          autoCapitalize="words"
        />
        <Text style={styles.helperText}>
          Et votre nom de famille c&apos;est...
        </Text>
        <CCRCTextInput
          style={styles.input}
          valid={lastnameDirty ? isValidName(lastname) : undefined}
          value={lastname}
          onChangeText={(value: string) => {
            setValues({
              firstname,
              firstnameDirty: true,
              lastname: value,
              lastnameDirty,
            });
          }}
          placeholder="Nom de famille"
          keyboardType="default"
          textContentType="familyName"
          autoCompleteType="name"
          autoCapitalize="words"
        />
      </View>
      <CCRCButton
        style={styles.button}
        title="Continuer "
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
    fontSize: 36,
  },
  helperText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    marginTop: 25,
  },
  input: {
    height: 50,
    paddingHorizontal: 5,
  },
  button: {
    marginVertical: 30,
  },
});

const mapDispatch = ({ profile: { setNames } }: Dispatch) => ({
  setNames,
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(null, mapDispatch)(CreateProfileScreen);
