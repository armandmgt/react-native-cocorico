import React, { FunctionComponent, useState } from 'react';
import {
  Button,
  Image,
  View,
  ActionSheetIOS,
  Platform,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import * as ImagePicker from 'expo-image-picker';

import CCRCButton from '@cocorico/components/CCRC/Button';

import styles from './ProfileImagePicker.styles';
import colors from '@cocorico/constants/colors';

type State = string | undefined;

interface Props {
  onValueChange: Function;
}

const ProfileImagePicker: FunctionComponent<Props> = ({ onValueChange }) => {
  const [image, setImage] = useState<State>(undefined);
  const [pickerModalVisible, setPickerModalVisible] = useState<boolean>(false);

  const closeModal = () => setPickerModalVisible(false);

  const pickImage = async (fromCamera: boolean = false) => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };
    const result = await (fromCamera
      ? ImagePicker.launchCameraAsync(options)
      : ImagePicker.launchImageLibraryAsync(options));

    if (!result.cancelled) {
      setImage(result.uri);
      onValueChange(result.uri);
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
        animationType="slide"
        transparent
        visible={pickerModalVisible}
        onRequestClose={closeModal}
        statusBarTranslucent
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
      <Image source={{ uri: image }} style={styles.image} />
      <Button title="Pick an image from camera roll" onPress={handlePicker} />
    </View>
  );
};

export default ProfileImagePicker;
