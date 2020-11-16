import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    ...spacing.mgh4,
  },
  animation: {
    position: 'relative',
    width: '100%',
    height: 'auto',
  },
  fallbackAnimation: {
    width: '95%',
    height: undefined,
    aspectRatio: 1,
  },
  text: {
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: '700',
    textAlign: 'center',
  },
});
