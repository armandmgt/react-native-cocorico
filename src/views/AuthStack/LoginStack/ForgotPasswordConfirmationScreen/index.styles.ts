import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import { Roboto } from '@cocorico/constants/fonts';
import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    ...spacing.pgh4,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
  },
  text: {
    fontFamily: Roboto[700],
    fontSize: 40,
    lineHeight: 40,
  },
  helperTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  helperText: {
    fontFamily: Roboto[400],
    fontSize: 16,
  },
  helperTextEmail: {
    fontFamily: Roboto[700],
  },
  coloredText: {
    color: colors.gradient2,
  },
});