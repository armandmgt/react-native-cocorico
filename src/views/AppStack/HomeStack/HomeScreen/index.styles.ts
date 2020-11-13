import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  footer: {
    flexDirection: 'row',
    ...spacing.mgt2,
    ...spacing.mgb8,
    justifyContent: 'space-around',
  },
  bottomIconContainer: {
    height: 70,
    width: 70,
    backgroundColor: colors.WHITE,
    borderRadius: 35,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
