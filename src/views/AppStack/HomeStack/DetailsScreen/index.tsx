import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';

import CCRCButton from '@cocorico/components/CCRC/Button';
import type { TypedNavigatorParams } from '@cocorico/components/Navigator/types';

import { RootState } from '@cocorico/services/store';

import styles from './index.styles';

interface Props extends StateProps {
  navigation: StackNavigationProp<TypedNavigatorParams<'HomeNavigator'>>;
  route: RouteProp<TypedNavigatorParams<'HomeNavigator'>, 'Details'>;
}

const DetailsScreen: FunctionComponent<Props> = ({
  navigation,
  route: {
    params: { profile },
  },
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {`${profile?.firstName} ${profile?.lastName}`}
      </Text>
      <Text style={styles.subtitle}>{`${profile?.age} age`}</Text>
      <Text style={styles.content}>{profile?.description}</Text>
      <CCRCButton title="Retour" onPress={() => navigation.goBack()} />
    </View>
  );
};

const mapState = ({ auth: { user } }: RootState) => ({
  description: user?.description,
});
type StateProps = ReturnType<typeof mapState>;

export default connect(mapState, null)(DetailsScreen);
