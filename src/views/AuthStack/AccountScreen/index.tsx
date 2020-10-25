import React, { FunctionComponent } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import AuthContainer from '@cocorico/components/AuthContainer';
import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCKeyboardAvoindingView from '@cocorico/components/CCRC/KeyboardAvoidingView';
import TextView from '@cocorico/components/CCRC/KeyboardAvoidingView/textView';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import ExpandedText from '@cocorico/components/ExpandedText';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase from '@cocorico/services/firebase';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'AuthNavigator'>>;
}

interface FormValues {
  email: string;
}

const AccountSchema = Yup.object().shape({
  email: Yup.string()
    .email("C'est une adresse email ça ?!")
    .required('Il nous manque ton adresse email...'),
});

const AccountScreen: FunctionComponent<Props> = ({ navigation }: Props) => {
  const initialValues: FormValues = { email: '' };

  const handleFormikSubmit = async ({ email }: FormValues) => {
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

  const renderFormikContent = ({
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    values: { email },
    errors,
  }: FormikProps<FormValues>) => {
    const getError = (field: keyof FormValues) =>
      errors[field] ? errors[field] : undefined;

    return (
      <>
        <View style={styles.content}>
          <TextView style={styles.text}>Bienvenue</TextView>
          <View style={styles.titleContainer}>
            <Text style={[styles.text, { ...spacing.pgr1 }]}>sur</Text>
            <ExpandedText
              after={
                <Text style={[styles.textImpact, styles.coloredText]}>!</Text>
              }
              characterWidth={27}
              end="o"
              fill="o"
              start="Cocoric"
              style={[styles.textImpact, { ...spacing.pgr1 }]}
            />
          </View>
          <TextView style={[styles.helperText, { ...spacing.mgb4 }]}>
            Pour commencer, entrez votre adresse email.
          </TextView>
          <CCRCTextInput
            outline
            anchorStyle={styles.errorContainer}
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            error={getError('email')}
            keyboardType="email-address"
            placeholder="Adresse email"
            returnKeyType="done"
            textContentType="emailAddress"
            valid={!getError('email')}
            value={email}
            onBlur={handleBlur('email')}
            onChangeText={handleChange('email')}
            onSubmitEditing={() => handleSubmit()}
          />
        </View>
        <CCRCButton
          disabled={!isValid || isSubmitting}
          style={{ ...spacing.mgb2 }}
          title="Continuer"
          variant="gradient"
          onPress={() => handleSubmit()}
        />
      </>
    );
  };

  return (
    <AuthContainer>
      <CCRCKeyboardAvoindingView>
        <Formik
          initialValues={initialValues}
          validationSchema={AccountSchema}
          onSubmit={handleFormikSubmit}
        >
          {renderFormikContent}
        </Formik>
      </CCRCKeyboardAvoindingView>
    </AuthContainer>
  );
};

export default AccountScreen;
