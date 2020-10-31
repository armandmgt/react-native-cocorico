import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  Image,
  View,
  ActionSheetIOS,
  Platform,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  TouchableNativeFeedback,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import CCRCButton from '@cocorico/components/CCRC/Button';

import DefaultProfileImage from '@cocorico/assets/images/default-profile-image.jpg';

import styles from './ProfileImagePicker.styles';

type State = string | undefined;

interface Props {
  onValueChange: Function;
}

const ProfileImagePicker: FunctionComponent<Props> = ({ onValueChange }) => {
  const [image, setImage] = useState<State>(undefined);
  const [pickerModalVisible, setPickerModalVisible] = useState<boolean>(false);

  const closeModal = () => setPickerModalVisible(false);

  useEffect(() => {
    const getPermission = async (
      permissionFnc:
        | 'requestCameraPermissionsAsync'
        | 'requestCameraRollPermissionsAsync',
    ) => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker[permissionFnc]();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
    getPermission('requestCameraPermissionsAsync');
    getPermission('requestCameraRollPermissionsAsync');
  }, []);

  const pickImage = async (fromCamera: boolean = false) => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    };
    const result = await (fromCamera
      ? ImagePicker.launchCameraAsync(options)
      : ImagePicker.launchImageLibraryAsync(options));

    if (!result.cancelled) {
      setImage(`data:image/jpeg;base64,${result.base64}`);
      onValueChange(`data:image/jpeg;base64,${result.base64}`);
      setPickerModalVisible(false);
    }
  };

  const showIOSActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          'Annuler',
          'Prendre un photo',
          'Choisir une photo de ma bibliothèque',
        ],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          pickImage(true);
        } else if (buttonIndex === 2) {
          pickImage();
        }
      },
    );
  };

  const showAndroidModal = () => setPickerModalVisible(true);

  const handlePicker = () => {
    switch (Platform.OS) {
      case 'ios':
        showIOSActionSheet();
        break;
      case 'android':
        showAndroidModal();
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.panel}>
      <Modal
        statusBarTranslucent
        transparent
        animationType="slide"
        visible={pickerModalVisible}
        onRequestClose={closeModal}
      >
        <>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Choisir une image ...</Text>
              <Pressable onPress={() => pickImage(true)}>
                <Text style={styles.modalChoice}>depuis la camera</Text>
              </Pressable>
              <Pressable onPress={() => pickImage()}>
                <Text style={styles.modalChoice}>depuis la bibliothèque</Text>
              </Pressable>
              <View style={styles.actionsContainer}>
                <CCRCButton
                  buttonStyle={styles.closeButton}
                  title="Annuler"
                  onPress={closeModal}
                />
              </View>
            </View>
          </View>
        </>
      </Modal>
      <View style={styles.imageView}>
        <Image
          source={image ? { uri: image } : DefaultProfileImage}
          style={styles.image}
        />
        <View style={styles.chooseImageButtonView}>
          <View style={styles.chooseImageButton}>
            <TouchableNativeFeedback onPress={handlePicker}>
              <Ionicons name="md-create" size={32} />
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileImagePicker;
