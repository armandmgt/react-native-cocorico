import React, { FunctionComponent } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from 'react-native';

import BackButton from './backButton';
import styles from './index.styles';

interface Props {
  children: React.ReactElement | React.ReactElement[];
  hasBackButton?: boolean;
}

const AuthContainer: FunctionComponent<Props> = ({
  children,
  hasBackButton,
}) => {
  const handleScreenPress = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>{!!hasBackButton && <BackButton />}</View>
      <TouchableWithoutFeedback
        touchSoundDisabled
        accessible={false}
        onPress={handleScreenPress}
      >
        <View style={styles.container}>{children}</View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AuthContainer;
