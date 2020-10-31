import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikHelpers } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase, { auth } from '@cocorico/services/firebase';
import type { Dispatch, RootState } from '@cocorico/services/store';

import styles from './index.styles';
import ProfileImagePicker from './ProfileImagePicker';

interface FormValues {
  firstName: string;
  lastName: string;
  genre?: string;
  profilePic?: string;
}

interface Props extends StateProps, DispatchProps {
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

const ProfileScreen: FunctionComponent<Props> = ({ user }) => {
  const initialValues: FormValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    profilePic: user?.profilePicUrl,
  };
  const onSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { profilePic, ...profile } = values;
    actions.setSubmitting(false);
    if (auth.currentUser && auth.currentUser.email)
      Firebase.saveProfile(
        auth.currentUser.email,
        { ...user, ...profile },
        profilePic,
      );
  };

  return (
    <View style={styles.container}>
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
              <ProfileImagePicker
                value={values.profilePic}
                onValueChange={handleChange('profilePic')}
              />
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
    </View>
  );
};

const mapState = ({ auth: { user } }: RootState) => ({
  user,
});
type StateProps = ReturnType<typeof mapState>;

const mapDispatch = ({ auth: { setUser } }: Dispatch) => ({
  setUser,
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState)(ProfileScreen);
