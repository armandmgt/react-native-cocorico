import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import { Pacifico } from '@cocorico/constants/fonts';
import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
  title: {
    fontFamily: Pacifico,
    fontSize: 24,
    color: colors.gradient3,
    textShadowColor: colors.gradient1,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  iconLeft: {
    ...spacing.pgl1,
  },
  iconRight: {
    ...spacing.pgr1,
  },
});
