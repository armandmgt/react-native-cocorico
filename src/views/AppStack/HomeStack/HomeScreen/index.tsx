import React, { FunctionComponent, useEffect, useState } from 'react';
import { View } from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import CardSwiper from '@cocorico/components/CardSwiper';
import EmptyCard from '@cocorico/components/CardSwiper/emptyCard';
import MatchModal from '@cocorico/components/MatchModal';

import Firebase from '@cocorico/services/firebase';
import { RootState, Dispatch } from '@cocorico/services/store';

import colors from '@cocorico/constants/colors';

import styles from './index.styles';

interface BottomButtonProps {
  onPress: () => void;
  color: string;
  icon: string;
}

const BottomButton = ({ onPress, color, icon }: BottomButtonProps) => (
  <TouchableOpacity
    style={[styles.bottomIconContainer, { borderColor: color }]}
    {...{ onPress }}
  >
    <Icon color={color} name={icon} size={35} onPress={onPress} />
  </TouchableOpacity>
);

interface Props extends StateProps, DispatchProps {}

const HomeScreen: FunctionComponent<Props> = ({
  getOtherProfiles,
  popFirstElement,
  user,
  otherProfiles,
}) => {
  const [matchModalOpen, setMatchModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getOtherProfiles();
  }, [getOtherProfiles]);

  function openMatchModal() {
    setMatchModalOpen(true);
  }

  function closeMatchModal() {
    setMatchModalOpen(false);
  }

  const handleSwiped = (liked: boolean) => {
    const currentProfile = otherProfiles[0];
    if (user?.id && liked) {
      Firebase.addLikeToProfile(currentProfile.id);
      if (currentProfile.likes?.includes(user.id)) {
        openMatchModal();
        Firebase.createConversation([
          user.id,
          user.firstName,
          user.lastName,
          currentProfile.id,
          currentProfile.firstName,
          currentProfile.lastName,
        ]);
      }
    }
    popFirstElement();
  };

  const profilesAvailable = otherProfiles.length > 0;

  return (
    <View style={styles.container}>
      {profilesAvailable ? (
        <>
          <CardSwiper {...{ profiles: otherProfiles, handleSwiped }} />
          <View style={styles.footer}>
            <BottomButton
              color={colors.RED}
              icon="x"
              onPress={() => handleSwiped(false)}
            />
            <BottomButton
              color={colors.GREEN}
              icon="heart"
              onPress={() => handleSwiped(true)}
            />
          </View>
        </>
      ) : (
        <EmptyCard />
      )}
      <MatchModal open={matchModalOpen} onClose={closeMatchModal} />
    </View>
  );
};

const mapState = ({ auth: { user }, otherProfiles }: RootState) => ({
  user,
  otherProfiles: otherProfiles.list,
});
type StateProps = ReturnType<typeof mapState>;

const mapDispatch = ({
  firestore: { getOtherProfiles },
  otherProfiles: { popFirstElement },
}: Dispatch) => ({
  getOtherProfiles,
  popFirstElement,
});
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(HomeScreen);
