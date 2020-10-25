import React, { FunctionComponent } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import AuthContainer from '@cocorico/components/AuthContainer';
import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCKeyboardAvoindingView from '@cocorico/components/CCRC/KeyboardAvoidingView';
import TextView from '@cocorico/components/CCRC/KeyboardAvoidingView/textView';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase from '@cocorico/services/firebase';
import { isValidEmail } from '@cocorico/services/utils';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'LoginNavigator'>>;
  route: RouteProp<TypedNavigatorParams<'LoginNavigator'>, 'ForgotPassword'>;
}

interface FormValues {
  email: string;
}

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("C'est une adresse email ça ?!")
    .required('Il nous manque une adresse email...'),
});

const ForgotPasswordScreen: FunctionComponent<Props> = ({
  navigation,
  route: {
    params: { email: defaultEmail },
  },
}: Props) => {
  const initialValues: FormValues = { email: defaultEmail };

  const handleFormikSubmit = async ({ email }: FormValues) => {
    Keyboard.dismiss();

    await Firebase.askResetPassword(email);
    navigation.push('ForgotPasswordConfirmation', { email });
  };

  const handleGoBack = () => {
    navigation.goBack();
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
          <TextView style={[styles.text, { ...spacing.mgb1 }]}>
            Ça arrive a tout le monde
            <Text style={styles.coloredText}>.</Text>
          </TextView>
          <TextView style={[styles.helperText, { ...spacing.mgb4 }]}>
            Vérifiez l&apos;adresse mail à laquelle nous allons vous envoyer un
            lien de réinitialisation de votre mot de passe
          </TextView>
          <CCRCTextInput
            outline
            anchorStyle={styles.errorContainer}
            autoCapitalize="none"
            autoCompleteType="email"
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
          title="Confirmer l'adresse email"
          variant="gradient"
          onPress={() => handleSubmit()}
        />
        <CCRCButton
          style={{ ...spacing.mgb4 }}
          title="Retour"
          variant="outline"
          onPress={handleGoBack}
        />
      </>
    );
  };

  return (
    <AuthContainer>
      <CCRCKeyboardAvoindingView>
        <Formik
          initialValues={initialValues}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleFormikSubmit}
        >
          {renderFormikContent}
        </Formik>
      </CCRCKeyboardAvoindingView>
    </AuthContainer>
  );
};

export default ForgotPasswordScreen;
