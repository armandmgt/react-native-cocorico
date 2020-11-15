import { StyleSheet } from 'react-native';

import colors from '@cocorico/constants/colors';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    backgroundColor: colors.GREY,
    borderRadius: 16,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shadow: {
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: colors.WHITE,
    fontSize: 40,
    fontWeight: '700',
  },
  age: {
    color: colors.WHITE,
    fontSize: 32,
    fontWeight: '500',
  },
  ageYears: {
    fontSize: 16,
  },
  label: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  labelBox: {
    position: 'absolute',
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
  },
  like: {
    left: 0,
    borderColor: colors.GREEN_ACCENT,
    color: colors.GREEN,
  },
  nope: {
    right: 0,
    borderColor: colors.RED_ACCENT,
    color: colors.RED,
  },
});
