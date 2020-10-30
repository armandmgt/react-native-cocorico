import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import { Roboto } from '@cocorico/constants/fonts';

export default StyleSheet.create({
  rootDisabled: {
    opacity: 0.25,
  },
  title: {
    color: colors.BLACK,
    fontSize: 14,
    fontFamily: Roboto[500],
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
});
