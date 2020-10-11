import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import type { MailboxStackParamList } from '@cocorico/components/Navigator';

interface Props {
  navigation: StackNavigationProp<MailboxStackParamList, 'Account'>;
}

const MailboxScreen: FunctionComponent<Props> = () => {
  return <View>Mailbox Screen</View>;
};

export default MailboxScreen;
