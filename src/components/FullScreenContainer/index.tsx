import React, { FunctionComponent } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const FullScreenContainer: FunctionComponent<ViewProps> = ({
  style,
  ...props
}) => {
  return <View style={[styles.root, style]} {...props} />;
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 35,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default FullScreenContainer;
