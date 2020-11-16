/* eslint-disable jsx-a11y/accessible-emoji */
import React, { FunctionComponent } from 'react';
import { Text, View, Modal } from 'react-native';

import ConfettiCannon from 'react-native-confetti-cannon';

import CCRCButton from '@cocorico/components/CCRC/Button';

import spacing from '@cocorico/constants/spacing';

import styles from './index.styles';

interface Props {
  open: boolean;
  onClose: () => void;
}

const MatchModal: FunctionComponent<Props> = (props) => {
  const { open, onClose } = props;

  return (
    <Modal animationType="slide" visible={open} onRequestClose={onClose}>
      <ConfettiCannon
        fadeOut
        count={500}
        explosionSpeed={0}
        fallSpeed={3000}
        origin={{ x: 0, y: 0 }}
      />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.boldText, { ...spacing.mgb1 }]}>Bingo !</Text>
          <Text style={[styles.subText, { ...spacing.mgb4 }]}>
            Il n&apos;y a plus qu&apos;a faire chauffer le four 😏...
          </Text>
        </View>
        <CCRCButton
          title="C'est reparti !"
          variant="gradient"
          onPress={onClose}
        />
      </View>
    </Modal>
  );
};

export default MatchModal;
