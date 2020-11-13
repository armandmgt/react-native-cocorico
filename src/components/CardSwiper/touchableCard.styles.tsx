import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  touchableAreaContent: {
    flex: 1,
  },
  touchables: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
  },
  touchablesHorizontal: {
    flexDirection: 'row',
    flex: 5,
  },
});
