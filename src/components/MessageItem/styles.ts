import { StyleSheet, TextProps, ViewProps } from 'react-native';

import colors from '@cocorico/constants/colors';
import spacing from '@cocorico/constants/spacing';

type MessageItemStylesProps = {
  container: ViewProps;
  avatar: ViewProps;
  details: ViewProps;
  title: TextProps;
};

export default StyleSheet.create<MessageItemStylesProps>({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 64,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    minWidth: '13%',
    ...spacing.pg2,
  },
  details: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomColor: colors.GREY_ACCENT,
    borderTopColor: colors.GREY_ACCENT,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    ...spacing.pgr2,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
});
