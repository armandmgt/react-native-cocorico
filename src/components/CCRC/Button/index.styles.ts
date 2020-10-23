import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import { Roboto } from '@cocorico/constants/fonts';
import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
  button: {
    ...spacing.pgh4,
    ...spacing.pgv2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  outline: {
    paddingVertical: spacing.pgv2.paddingVertical - 4,
    borderColor: colors.BLACK,
    borderWidth: 4,
  },
  fill: {
    backgroundColor: colors.LIGHTBLUE,
  },
  rootDisabled: {
    opacity: 0.25,
  },
  title: {
    color: colors.WHITE,
    fontSize: 20,
    fontFamily: Roboto[700],
    fontWeight: 'bold',
  },
  titleOutline: {
    color: colors.BLACK,
  },
});
