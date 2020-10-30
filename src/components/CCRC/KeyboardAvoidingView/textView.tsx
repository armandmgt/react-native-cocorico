import React, { FunctionComponent } from 'react';
import { View, Text, TextProps, ViewStyle } from 'react-native';

import styles from './textView.styles';

interface Props extends TextProps {
  shrinkable?: boolean;
  lineHeight?: number;
  containerStyle?: ViewStyle;
}

const TextView: FunctionComponent<Props> = ({
  shrinkable,
  lineHeight,
  containerStyle,
  numberOfLines,
  ...other
}) => {
  const getShrinkableStyle = () => {
    const safeNumberOfLines = numberOfLines || 0;
    const safeLineHeight = lineHeight || 20;

    return [
      styles.shrinkable,
      {
        minHeight: safeLineHeight,
        maxHeight: safeNumberOfLines * safeLineHeight,
      },
    ];
  };

  return (
    <View style={[shrinkable && getShrinkableStyle(), containerStyle]}>
      <Text numberOfLines={numberOfLines} {...other} />
    </View>
  );
};

export default TextView;
