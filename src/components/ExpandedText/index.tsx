import React, { FunctionComponent, useState, useEffect } from 'react';
import { View, Text, StyleProp, TextStyle } from 'react-native';

import styles from './index.styles';

interface Props {
  start: string;
  fill: string;
  end: string;
  characterWidth: number;
  after: React.ReactElement;
  style: StyleProp<TextStyle>;
}

const ExpandedText: FunctionComponent<Props> = (props: Props) => {
  const { start, fill, end, characterWidth, after, style } = props;
  const [content, setContent] = useState<string>('');
  const [selfWidth, setSelWidth] = useState<number>(0);

  useEffect(() => {
    const startWidth = start.length * characterWidth;
    const endWidth = end.length * characterWidth;
    const fillWidth = fill.length * characterWidth;

    const nbFill = Math.max(
      Math.floor((selfWidth - (startWidth + endWidth)) / fillWidth),
      0,
    );

    setContent(`${start}${fill.repeat(nbFill)}${end}`);
  }, [characterWidth, end, fill, selfWidth, start]);

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        setSelWidth(event.nativeEvent.layout.width);
      }}
    >
      <Text style={style}>{content}</Text>
      {after}
    </View>
  );
};

export default ExpandedText;
