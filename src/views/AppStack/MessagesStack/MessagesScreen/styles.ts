import { StyleSheet, ViewProps } from 'react-native';

type MessagesStylesProps = {
  container: ViewProps;
};

export default StyleSheet.create<MessagesStylesProps>({
  container: {
    flex: 1,
  },
});
