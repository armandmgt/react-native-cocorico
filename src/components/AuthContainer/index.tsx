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
      <TouchableWithoutFeedback accessible={false} onPress={handleScreenPress}>
        <View style={styles.container}>
          {!!hasBackButton && <BackButton style={styles.backButton} />}
          {children}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AuthContainer;
