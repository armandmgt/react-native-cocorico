import { StyleSheet } from 'react-native';

import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
  safeContainer: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    ...spacing.mgh4,
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
  },
});
