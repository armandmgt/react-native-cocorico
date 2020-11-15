import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { FieldArray, Formik, FormikHelpers } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import CCRCButton from '@cocorico/components/CCRC/Button';
import CCRCTextInput from '@cocorico/components/CCRC/TextInput';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import Firebase, { auth } from '@cocorico/services/firebase';
import type { Dispatch, RootState } from '@cocorico/services/store';

import { UserImages } from '@cocorico/constants/types';

import styles from './index.styles';
import ImagePicker from './ProfileImagePicker';
import ProfileImagePicker from './ProfileImagePicker';

interface FormValues extends UserImages {}

interface Props extends StateProps, DispatchProps {
  navigation: StackNavigationProp<TypedNavigatorParams<'ProfileNavigator'>>;
}

const UserImagesSchema = Yup.object({
  images: Yup.array().required(),
});

const ImageCollectionScreen: FunctionComponent<Props> = ({ user }) => {
  const initialValues: FormValues = {
    images: user?.images || [],
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
          const starts = values.images.map((i) => i.substring(0, 10));
          console.log(starts);
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
                  name="images"
                  render={(arrayHelpers) => (
                    <>
                      {values.images.map((image, index) => (
                        <View style={{ flexBasis: '33%' }}>
                          <ProfileImagePicker
                            key={image}
                            value={image}
                            onDelete={() => arrayHelpers.remove(index)}
                            onValueChange={handleChange(`images[${index}]`)}
                          />
                        </View>
                      ))}
                      {values.images.length < 6 ? (
                        <View style={{ flexBasis: '33%' }}>
                          <ProfileImagePicker
                            onValueChange={handleChange(
                              `images[${values.images.length}]`,
                            )}
                          />
                        </View>
                      ) : null}
                      {5 - values.images.length !== 0
                        ? Array.from(
                            { length: 5 - values.images.length },
                            (_, k) => (
                              <View key={k} style={{ flexBasis: '33%' }}>
                                <ProfileImagePicker
                                  disabled
                                  onValueChange={handleChange(
                                    `images[${values.images.length}]`,
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
              <Text>{errorIfPresent('images')}</Text>
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
