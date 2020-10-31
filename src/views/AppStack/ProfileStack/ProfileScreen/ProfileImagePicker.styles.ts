import { Platform, StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import { Roboto } from '@cocorico/constants/fonts';
import spacing from '@cocorico/constants/spacing';

const elevatedStyles = Platform.select({
  ios: {
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  android: {
    elevation: 10,
  },
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
    ...elevatedStyles,
  },
  chooseImageButtonView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
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
  backdrop: {
    backgroundColor: colors.BLACK_06,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    ...spacing.mg2,
    ...spacing.pgh2_5,
    ...spacing.pgv1_75,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    elevation: 5,
  },
  actionsContainer: {
    ...spacing.mgt2,
  },
  closeButton: {
    ...spacing.pgv0_75,
    ...spacing.pgh2_5,
    backgroundColor: colors.RED_ACCENT,
  },
  modalText: {
    ...spacing.mgb1,
    fontFamily: Roboto[500],
    fontSize: 20,
    color: colors.GREY,
  },
  modalChoice: {
    ...spacing.pgv1,
    fontFamily: Roboto[500],
    fontSize: 20,
    color: colors.BLACK,
  },
});
