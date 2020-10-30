import { StyleSheet } from 'react-native';

import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
  safeContainer: {
    flexGrow: 1,
  },
  header: {
    ...spacing.mgh4,
  },
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    ...spacing.mgh4,
  },
});
