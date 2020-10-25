import React, { FunctionComponent } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import AuthContainer from '@cocorico/components/AuthContainer';
import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCKeyboardAvoindingView from '@cocorico/components/CCRC/KeyboardAvoidingView';
import TextView from '@cocorico/components/CCRC/KeyboardAvoidingView/textView';
import CCRCTextButton from '@cocorico/components/CCRC/TextButton';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase from '@cocorico/services/firebase';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'LoginNavigator'>>;
  route: RouteProp<TypedNavigatorParams<'LoginNavigator'>, 'EnterPassword'>;
}

interface FormValues {
  password: string;
}

const EnterPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Il nous manque ton mot de passe...'),
});

const EnterPasswordScreen: FunctionComponent<Props> = ({
  navigation,
  route: {
    params: { email },
  },
}: Props) => {
  const initialValues: FormValues = { password: '' };

  const handleForgotPassword = () => {
    navigation.push('ForgotPassword', { email });
  };

  const handleFormikSubmit = async (
    { password }: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    Keyboard.dismiss();

    const result = await Firebase.login(email, password);

    if (!result.success) {
      if (result.error?.message)
        actions.setFieldError('password', result.error.message);
    }
  };

  const renderFormikContent = ({
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    values: { password },
    errors,
  }: FormikProps<FormValues>) => {
    const getError = (field: keyof FormValues) =>
      errors[field] ? errors[field] : undefined;

    return (
      <>
        <View style={styles.content}>
          <TextView style={[styles.text, { ...spacing.mgb1 }]}>
            C&apos;est chouette de vous revoir
            <Text style={styles.coloredText}>.</Text>
          </TextView>
          <TextView style={[styles.helperText, { ...spacing.mgb4 }]}>
            Renseignez votre mot de passe afin de vous connecter.
          </TextView>
          <CCRCTextInput
            autoFocus
            outline
            secureTextEntry
            anchorStyle={styles.errorContainer}
            autoCompleteType="password"
            error={getError('password')}
            keyboardType="default"
            placeholder="Votre mot de passe"
            returnKeyType="done"
            textContentType="password"
            valid={!getError('password')}
            value={password}
            onBlur={handleBlur('password')}
            onChangeText={handleChange('password')}
            onSubmitEditing={() => handleSubmit()}
          />
        </View>
        <CCRCTextButton
          style={{ ...spacing.mgb2 }}
          title="Mot de passe oublié ?"
          onPress={handleForgotPassword}
        />
        <CCRCButton
          disabled={!isValid || isSubmitting}
          style={{ ...spacing.mgb2 }}
          title="Connexion"
          variant="gradient"
          onPress={() => handleSubmit()}
        />
      </>
    );
  };

  return (
    <AuthContainer hasBackButton>
      <CCRCKeyboardAvoindingView>
        <Formik
          initialValues={initialValues}
          validationSchema={EnterPasswordSchema}
          onSubmit={handleFormikSubmit}
        >
          {renderFormikContent}
        </Formik>
      </CCRCKeyboardAvoindingView>
    </AuthContainer>
  );
};

export default EnterPasswordScreen;
