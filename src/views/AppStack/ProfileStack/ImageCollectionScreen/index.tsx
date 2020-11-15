import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { FieldArray, Formik, FormikHelpers } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import CCRCButton from '@cocorico/components/CCRC/Button';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase, { auth } from '@cocorico/services/firebase';
import type { Dispatch, RootState } from '@cocorico/services/store';

import { UserImages } from '@cocorico/constants/types';

import styles from './index.styles';
import ProfileImagePicker from './ProfileImagePicker';

interface FormValues extends UserImages {}

interface Props extends StateProps, DispatchProps {
  navigation: StackNavigationProp<TypedNavigatorParams<'ProfileNavigator'>>;
}

const UserImagesSchema = Yup.object({
  pictures: Yup.array().required(),
});

const ImageCollectionScreen: FunctionComponent<Props> = ({ user }) => {
  const initialValues: FormValues = {
    pictures: user?.pictures || [],
  };

  const onSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    if (auth.currentUser && auth.currentUser.email) {
      await Firebase.saveImages(auth.currentUser.email, values);
    }
    actions.setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={UserImagesSchema}
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
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                <FieldArray
                  name="pictures"
                  render={(arrayHelpers) => (
                    <>
                      {values.pictures.map((image, index) => (
                        <View key={image} style={{ flexBasis: '33%' }}>
                          <ProfileImagePicker
                            key={image}
                            value={image}
                            onDelete={() => arrayHelpers.remove(index)}
                            onValueChange={handleChange(`pictures[${index}]`)}
                          />
                        </View>
                      ))}
                      {values.pictures.length < 6 ? (
                        <View style={{ flexBasis: '33%' }}>
                          <ProfileImagePicker
                            onValueChange={handleChange(
                              `pictures[${values.pictures.length}]`,
                            )}
                          />
                        </View>
                      ) : null}
                      {5 - values.pictures.length !== 0
                        ? Array.from(
                            { length: 5 - values.pictures.length },
                            (_, k) => (
                              <View key={k} style={{ flexBasis: '33%' }}>
                                <ProfileImagePicker
                                  disabled
                                  onValueChange={handleChange(
                                    `pictures[${values.pictures.length}]`,
                                  )}
                                />
                              </View>
                            ),
                          )
                        : null}
                    </>
                  )}
                />
              </View>
              <Text>{errorIfPresent('pictures')}</Text>
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

export default connect(mapState)(ImageCollectionScreen);
