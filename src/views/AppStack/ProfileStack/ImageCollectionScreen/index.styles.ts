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
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageCard: {
    flexBasis: '33%',
  },
});
