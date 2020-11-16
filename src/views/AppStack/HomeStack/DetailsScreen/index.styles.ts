import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    ...spacing.pg4,
    backgroundColor: colors.WHITE,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 46,
    ...spacing.mgb0_5,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.GREY,
    ...spacing.mgb3,
  },
  content: {
    flexGrow: 1,
    fontSize: 20,
  },
});
