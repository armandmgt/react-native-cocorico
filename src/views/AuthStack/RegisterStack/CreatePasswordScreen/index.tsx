import React, { FunctionComponent, useRef } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import AuthContainer from '@cocorico/components/AuthContainer';
import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCKeyboardAvoindingView from '@cocorico/components/CCRC/KeyboardAvoidingView';
import TextView from '@cocorico/components/CCRC/KeyboardAvoidingView/textView';
import CCRCTextInput, {
  CustomTextInputHandle,
} from '@cocorico/components/CCRC/TextInput';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'RegisterNavigator'>>;
  route: RouteProp<TypedNavigatorParams<'RegisterNavigator'>, 'CreatePassword'>;
}

interface FormValues {
  password: string;
  passwordConfirmation: string;
}

const CreatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Il est un peu faiblard ce mot de passe.')
    .required('Il nous manque un mot de passe...'),
  passwordConfirmation: Yup.string()
    .oneOf(
      [Yup.ref('password'), ''],
      'Les deux mots de passes ne sont pas identiques.',
    )
    .required('Il faut confirmer votre mot de passe...'),
});

const CreatePasswordScreen: FunctionComponent<Props> = ({
  navigation,
  route: {
    params: { email },
  },
}: Props) => {
  const initialValues: FormValues = { password: '', passwordConfirmation: '' };
  const passwordConfirmationRef = useRef<CustomTextInputHandle>(null);

  const handleFormikSubmit = async ({ password }: FormValues) => {
    Keyboard.dismiss();

    navigation.push('CreateAccount', { email, password });
  };

  const focusPasswordConfirmation = () => {
    passwordConfirmationRef.current?.focus();
  };

  const renderFormikContent = ({
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    values: { password, passwordConfirmation },
    errors,
    touched,
  }: FormikProps<FormValues>) => {
    const getError = (field: keyof FormValues) =>
      touched[field] && errors[field] ? errors[field] : undefined;

    return (
      <>
        <View style={styles.content}>
          <TextView
            shrinkable
            containerStyle={styles.titleContainer}
            lineHeight={40}
            numberOfLines={2}
            style={styles.text}
          >
            C&apos;est votre première fois ici
            <Text style={styles.coloredText}>.</Text>
          </TextView>
          <TextView style={[styles.helperText, { ...spacing.mgb3 }]}>
            Veuillez chosisir le mot de passe qui vous permettra de vous
            connecter.
          </TextView>
          <CCRCTextInput
            outline
            secureTextEntry
            anchorStyle={styles.errorContainer}
            autoCompleteType="password"
            error={getError('password')}
            key="password"
            keyboardType="default"
            placeholder="Votre mot de passe"
            returnKeyType="next"
            style={{ ...spacing.mgb1 }}
            textContentType="newPassword"
            valid={!getError('password')}
            value={password}
            onBlur={handleBlur('password')}
            onChangeText={handleChange('password')}
            onSubmitEditing={focusPasswordConfirmation}
          />
          <CCRCTextInput
            outline
            secureTextEntry
            anchorStyle={styles.errorContainer}
            autoCompleteType="password"
            error={getError('passwordConfirmation')}
            key="passwordConfirmation"
            keyboardType="default"
            placeholder="Confirmation de votre mot de passe"
            ref={passwordConfirmationRef}
            returnKeyType="done"
            style={{ ...spacing.mgb3 }}
            textContentType="password"
            valid={!getError('passwordConfirmation')}
            value={passwordConfirmation}
            onBlur={handleBlur('passwordConfirmation')}
            onChangeText={handleChange('passwordConfirmation')}
            onSubmitEditing={() => handleSubmit()}
          />
        </View>
        <CCRCButton
          disabled={!isValid || isSubmitting}
          style={{ ...spacing.mgb2 }}
          title="Choisir le mot de passe"
          variant="gradient"
          onPress={() => handleSubmit()}
        />
      </>
    );
  };

  return (
    <AuthContainer hasBackButton>
      <CCRCKeyboardAvoindingView offset={36}>
        <Formik
          initialValues={initialValues}
          validationSchema={CreatePasswordSchema}
          onSubmit={handleFormikSubmit}
        >
          {renderFormikContent}
        </Formik>
      </CCRCKeyboardAvoindingView>
    </AuthContainer>
  );
};

export default CreatePasswordScreen;
