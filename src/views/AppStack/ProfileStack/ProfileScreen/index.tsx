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

import { Profile } from '@cocorico/constants/types';

import styles from './index.styles';
import ProfileImage from './ProfileImage';

interface ProfileFormValues extends Profile {}

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

const ProfileScreen: FunctionComponent<Props> = ({ user, navigation }) => {
  const initialValues: ProfileFormValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  };
  const onSubmit = async (
    values: ProfileFormValues,
    actions: FormikHelpers<ProfileFormValues>,
  ) => {
    if (auth.currentUser && auth.currentUser.email) {
      await Firebase.saveProfile(auth.currentUser.email, values);
    }
    actions.setSubmitting(false);
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
          const errorIfPresent = (field: keyof ProfileFormValues) =>
            touched[field] && errors[field] ? errors[field] : undefined;
          console.log(user.images.map((image) => image.substring(0, 10)));
          return (
            <>
              <ProfileImage
                profilePic={user?.images && user.images[0]}
                onPress={() => navigation.push('ImageCollection')}
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
