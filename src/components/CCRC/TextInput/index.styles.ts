import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import { Roboto } from '@cocorico/constants/fonts';
import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  rootOutlined: {
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.BLACK,
  },
  rootInvalid: {
    borderColor: colors.RED,
  },
  multiline: {
    ...spacing.pgt1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'normal',
    ...spacing.pgv2,
    ...spacing.pgh2,
  },
  visibilityContainer: {
    ...spacing.pgr2,
  },
  visibilityIcon: {
    marginVertical: -5,
  },
  errorText: {
    fontFamily: Roboto[300],
    fontSize: 13,
    color: colors.RED,
    textAlign: 'center',
  },
  anchor: {
    ...spacing.mgt1,
    position: 'relative',
    alignItems: 'center',
  },
});
