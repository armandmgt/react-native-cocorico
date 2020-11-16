import React from 'react';
import { StyleSheet, RefreshControl, ScrollView, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 50,
  },
});

interface NoMessageProps {
  refresh: () => void;
  refreshing: boolean;
}
const NoMessageScreen = ({ refresh, refreshing }: NoMessageProps) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={!refreshing} onRefresh={refresh} />
      }
    >
      <Text style={styles.title}>No messages...</Text>
    </ScrollView>
  );
};

export default NoMessageScreen;
