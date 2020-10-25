import React, { FunctionComponent } from 'react';
import { View, Text, TextProps } from 'react-native';

interface Props extends TextProps {}

const TextView: FunctionComponent<Props> = (props) => {
  return (
    <View>
      <Text {...props} />
    </View>
  );
};

export default TextView;
