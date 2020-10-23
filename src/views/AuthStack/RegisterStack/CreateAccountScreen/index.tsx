import React, { FunctionComponent, useState } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase from '@cocorico/services/firebase';
import { useValues } from '@cocorico/services/utils/hooks';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'RegisterNavigator'>>;
  route: RouteProp<TypedNavigatorParams<'RegisterNavigator'>, 'CreateAccount'>;
}

const CreateAccountScreen: FunctionComponent<Props> = ({
  navigation,
  route: {
    params: { email, password },
  },
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [{ firstName, lastName }, updateValue] = useValues<{
    firstName: string;
    lastName: string;
  }>({
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);

    const result = await Firebase.register(email, password, {
      firstName,
      lastName,
    });

    if (!result.success) {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.text, { ...spacing.mgb1 }]}>
          Une dernière petite chose
          <Text style={styles.coloredText}>.</Text>
        </Text>
        <Text style={[styles.helperText, { ...spacing.mgb4 }]}>
          Afin de mieux vous connaître, veuillez renseigner ces champs.
        </Text>
        <CCRCTextInput
          outline
          value={firstName}
          onChangeText={updateValue('firstName')}
          placeholder="Prénom"
          textContentType="name"
          autoCompleteType="name"
          autoCapitalize="words"
          returnKeyType="next"
        />
        <CCRCTextInput
          outline
          value={lastName}
          onChangeText={updateValue('lastName')}
          placeholder="Nom"
          textContentType="familyName"
          autoCompleteType="name"
          autoCapitalize="words"
          returnKeyType="next"
        />
      </View>
      <CCRCButton
        variant="gradient"
        disabled={loading || !(firstName && lastName)}
        style={{ ...spacing.mgb4 }}
        title="C'est parti !"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default CreateAccountScreen;
