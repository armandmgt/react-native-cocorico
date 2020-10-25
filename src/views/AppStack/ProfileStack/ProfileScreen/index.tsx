import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import FullScreenContainer from '@cocorico/components/AuthContainer';
import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import styles from './index.styles';
import ProfileImagePicker from './ProfileImagePicker';

interface FormValues {
  firstName: string;
  lastName: string;
  genre: string;
  image?: string;
}

interface Props {
  navigation: StackNavigationProp<TypedNavigatorParams<'ProfileNavigator'>>;
}

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Trop court !')
    .max(50, 'Trop long !')
    .required('Champ obligatoire.'),
  lastName: Yup.string()
    .min(2, 'Trop court !')
    .max(50, 'Trop long !')
    .required('Champ obligatoire.'),
});

const ProfileScreen: FunctionComponent<Props> = () => {
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    genre: '',
  };
  const onSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    actions.setSubmitting(false);
  };

  return (
    <FullScreenContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={onSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          isSubmitting,
          values,
          touched,
          errors,
        }) => {
          const errorIfPresent = (field: keyof FormValues) =>
            touched[field] && errors[field] ? errors[field] : undefined;
          return (
            <>
              <ProfileImagePicker onValueChange={handleChange('image')} />
              <View style={styles.field}>
                <Text>Prénom</Text>
                <CCRCTextInput
                  error={errorIfPresent('firstName')}
                  style={styles.input}
                  value={values.firstName}
                  onBlur={handleBlur('firstName')}
                  onChangeText={handleChange('firstName')}
                />
              </View>
              <View style={styles.field}>
                <Text>Nom de famille</Text>
                <CCRCTextInput
                  error={errorIfPresent('lastName')}
                  style={styles.input}
                  value={values.lastName}
                  onBlur={handleBlur('lastName')}
                  onChangeText={handleChange('lastName')}
                />
              </View>
              <CCRCButton
                disabled={!isValid || isSubmitting}
                title="Enregistrer"
                variant="gradient"
                onPress={() => handleSubmit()}
              />
            </>
          );
        }}
      </Formik>
    </FullScreenContainer>
  );
};

export default ProfileScreen;
