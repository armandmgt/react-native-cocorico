import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import { Roboto } from '@cocorico/constants/fonts';
import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
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
  helperText: {
    fontFamily: Roboto[400],
    fontSize: 16,
  },
  coloredText: {
    color: colors.gradient2,
  },
  errorContainer: {
    minHeight: 16,
  },
});
