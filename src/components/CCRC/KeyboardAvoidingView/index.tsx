import React, { FunctionComponent } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  KeyboardAvoidingViewProps,
} from 'react-native';

import { useHeaderHeight } from '@react-navigation/stack';
import Constants from 'expo-constants';

import styles from './index.styles';

interface Props {
  children: React.ReactElement | React.ReactElement[];
  behavior?: KeyboardAvoidingViewProps['behavior'];
  offset?: number;
}

const CustomKeyboardAvoindingView: FunctionComponent<Props> = ({
  children,
  behavior = Platform.select({ ios: 'padding' }),
  offset = 0,
}) => {
  const headerHeight = useHeaderHeight();
  const keyboardVerticalOffset =
    headerHeight > 0 ? headerHeight : Constants.statusBarHeight;

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={keyboardVerticalOffset + offset}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAvoindingView;
