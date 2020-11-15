import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
  container: {
    ...spacing.pgh4,
    ...spacing.pgv2,
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  formContainer: {
    flex: 1,
  },
  field: {
    ...spacing.mgv1,
    ...spacing.mgh1,
  },
  fieldTitleSpacing: {
    ...spacing.mgb1,
  },
  fieldName: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    ...spacing.mgt2,
  },
  input: {},
});
