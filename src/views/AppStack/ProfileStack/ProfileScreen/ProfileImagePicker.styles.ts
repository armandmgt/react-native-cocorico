import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';
import { Roboto } from '@cocorico/constants/fonts';
import spacing from '@cocorico/constants/spacing';

export default StyleSheet.create({
  panel: {
    backgroundColor: colors.RED,
  },
  image: {
    width: 200,
    height: 200,
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
    elevation: 1,
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
