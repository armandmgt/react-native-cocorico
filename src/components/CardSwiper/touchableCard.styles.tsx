import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  innerCard: {
    zIndex: 2,
  },
  touchableAreaContent: {
    flex: 1,
  },
  touchables: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    zIndex: 3,
  },
  touchablesHorizontal: {
    flexDirection: 'row',
    flex: 5,
  },
});
