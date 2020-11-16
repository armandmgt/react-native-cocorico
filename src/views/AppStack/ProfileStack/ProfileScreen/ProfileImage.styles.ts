import { Platform, StyleSheet, ViewStyle } from 'react-native';

import colors from '@cocorico/constants/colors';
import spacing from '@cocorico/constants/spacing';

const elevatedStyles = Platform.select<ViewStyle>({
  ios: {
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  android: {
    elevation: 10,
  },
  default: {},
});
export default StyleSheet.create({
  panel: {
    ...spacing.mgt0_75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '50%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 1000,
  },
  overlapImage: { position: 'absolute' },
  imageView: {
    position: 'relative',
    borderRadius: 1000,
  },
  elevatedStyles,
  chooseImageButtonView: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
  chooseImageButton: {
    ...elevatedStyles,
    ...spacing.pg1,
    backgroundColor: colors.WHITE_ACCENT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    aspectRatio: 1,
  },
});
