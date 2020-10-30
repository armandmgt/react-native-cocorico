import React, { FunctionComponent, useRef } from 'react';
import { View, Text, Keyboard } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import AuthContainer from '@cocorico/components/AuthContainer';
import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCKeyboardAvoindingView from '@cocorico/components/CCRC/KeyboardAvoidingView';
import TextView from '@cocorico/components/CCRC/KeyboardAvoidingView/textView';
import CCRCTextInput, {
  CustomTextInputHandle,
} from '@cocorico/components/CCRC/TextInput';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase from '@cocorico/services/firebase';

import spacing from '@cocorico/constants/spacing';
import validators from '@cocorico/constants/validators';

import styles from './index.styles';

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'RegisterNavigator'>>;
  route: RouteProp<TypedNavigatorParams<'RegisterNavigator'>, 'CreateAccount'>;
}

interface FormValues {
  firstName: string;
  lastName: string;
}

const CreateAccountSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Votre prénom est trop court')
    .matches(
      RegExp(validators.name),
      'Votre prénom contient des caractères non-autorisés.',
    )
    .required('Il nous manque ton prénom...'),
  lastName: Yup.string()
    .min(2, 'Votre nom est trop court')
    .matches(
      RegExp(validators.name),
      'Votre nom contient des caractères non-autorisés.',
    )
    .required('Il nous manque ton nom...'),
});

const CreateAccountScreen: FunctionComponent<Props> = ({
  route: {
    params: { email, password },
  },
}: Props) => {
  const initialValues: FormValues = { firstName: '', lastName: '' };
  const lastNameRef = useRef<CustomTextInputHandle>(null);

  const handleFormikSubmit = async (
    { firstName, lastName }: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    Keyboard.dismiss();

    const result = await Firebase.register(email, password, {
      firstName,
      lastName,
    });

    if (!result.success) {
      actions.setSubmitting(true);
    }
  };

  const focusLastName = () => {
    lastNameRef.current?.focus();
  };

  const renderFormikContent = ({
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
    values: { firstName, lastName },
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
            Une dernière petite chose
            <Text style={styles.coloredText}>.</Text>
          </TextView>
          <TextView style={[styles.helperText, { ...spacing.mgb3 }]}>
            Afin de mieux vous connaître, veuillez renseigner ces champs.
          </TextView>
          <CCRCTextInput
            outline
            autoCapitalize="words"
            autoCompleteType="name"
            error={getError('firstName')}
            placeholder="Prénom"
            returnKeyType="next"
            style={{ ...spacing.mgb1 }}
            textContentType="name"
            valid={!getError('firstName')}
            value={firstName}
            onBlur={handleBlur('firstName')}
            onChangeText={handleChange('firstName')}
            onSubmitEditing={focusLastName}
          />
          <CCRCTextInput
            outline
            autoCapitalize="words"
            autoCompleteType="name"
            error={getError('lastName')}
            placeholder="Nom"
            ref={lastNameRef}
            returnKeyType="done"
            style={{ ...spacing.mgb3 }}
            textContentType="familyName"
            valid={!getError('lastName')}
            value={lastName}
            onBlur={handleBlur('lastName')}
            onChangeText={handleChange('lastName')}
            onSubmitEditing={() => handleSubmit()}
          />
        </View>
        <CCRCButton
          disabled={!isValid || isSubmitting}
          style={{ ...spacing.mgb2 }}
          title="C'est parti !"
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
          validationSchema={CreateAccountSchema}
          onSubmit={handleFormikSubmit}
        >
          {renderFormikContent}
        </Formik>
      </CCRCKeyboardAvoindingView>
    </AuthContainer>
  );
};

export default CreateAccountScreen;
