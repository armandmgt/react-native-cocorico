import React, { FunctionComponent } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';

import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import ExpandedText from '@cocorico/components/ExpandedText';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase from '@cocorico/services/firebase';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface FormValues {
  email: string;
}

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'AuthNavigator'>>;
}

const AccountSchema = Yup.object().shape({
  email: Yup.string()
    .email("Le format de l'email est mauvais.")
    .required('Un email est requis.'),
});

const AccountScreen: FunctionComponent<Props> = ({ navigation }: Props) => {
  const initialValues: FormValues = { email: '' };
  const onSubmit = async ({ email }: FormValues) => {
    Keyboard.dismiss();

    const userExists = await Firebase.doesUserExist(email);

    if (userExists) {
      navigation.navigate('LoginNavigator', {
        screen: 'EnterPassword',
        params: { email },
      });
    } else {
      navigation.navigate('RegisterNavigator', {
        screen: 'CreatePassword',
        params: { email },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={AccountSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
          values: { email },
          errors,
        }) => {
          const errorIfPresent = (field: keyof FormValues) => {
            return errors[field] ? errors[field] : undefined;
          };

          return (
            <>
              <View style={styles.content}>
                <Text style={styles.text}>Bienvenue</Text>
                <View style={styles.titleContainer}>
                  <Text style={[styles.text, { ...spacing.pgr1 }]}>sur</Text>
                  <ExpandedText
                    start="Cocoric"
                    fill="o"
                    end="o"
                    characterWidth={27}
                    style={[styles.textImpact, { ...spacing.pgr1 }]}
                    after={
                      <Text style={[styles.textImpact, styles.coloredText]}>
                        !
                      </Text>
                    }
                  />
                </View>
                <Text style={[styles.helperText, { ...spacing.mgb4 }]}>
                  Pour commencer, entrez votre adresse email.
                </Text>
                <CCRCTextInput
                  outline
                  valid={isValid}
                  value={email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errorIfPresent('email')}
                  errorPosition="absolute"
                  placeholder="Adresse email"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCompleteType="email"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => handleSubmit()}
                />
              </View>
              <CCRCButton
                variant="gradient"
                disabled={!isValid || isSubmitting}
                style={{ ...spacing.mgb4 }}
                title="Continuer"
                onPress={() => handleSubmit()}
              />
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default AccountScreen;
