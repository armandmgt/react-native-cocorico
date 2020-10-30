import { StyleSheet, TextProps, ViewProps } from 'react-native';

import colors from '@cocorico/constants/colors';

type MessageItemStylesProps = {
  container: ViewProps;
  title: TextProps;
};

export default StyleSheet.create<MessageItemStylesProps>({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: 72,
    borderBottomColor: colors.silver,
    borderTopColor: colors.silver,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
