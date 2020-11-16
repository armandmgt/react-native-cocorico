import React, { FunctionComponent } from 'react';
import { Text, ViewStyle, TouchableOpacity } from 'react-native';

import { Feather as Icon } from '@expo/vector-icons';
import { StackHeaderTitleProps } from '@react-navigation/stack';

import colors from '@cocorico/constants/colors';

import styles from './headerButtons.styles';

type IconSide = 'left' | 'right';
type IconDirection = 'left' | 'right';

const getSideStyle = (side: IconSide) => {
  const sideStyles: { [key in IconSide]: ViewStyle } = {
    left: styles.iconLeft,
    right: styles.iconRight,
  };

  return sideStyles[side];
};

interface HeaderTitleProps extends StackHeaderTitleProps {
  onPress: () => void;
}

const HeaderTitle: FunctionComponent<HeaderTitleProps> = ({
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      <Text style={styles.title}>{children}</Text>
    </TouchableOpacity>
  );
};

interface HeaderProfileProps {
  onPress: () => void;
  side?: IconSide;
}

const HeaderProfile: FunctionComponent<HeaderProfileProps> = ({
  onPress,
  side = 'left',
}) => {
  return (
    <Icon
      color={colors.BLACK}
      name="user"
      size={20}
      style={[styles.icon, getSideStyle(side)]}
      onPress={onPress}
    />
  );
};

interface HeaderMailboxProps {
  onPress: () => void;
  side?: IconSide;
}

const HeaderMailbox: FunctionComponent<HeaderMailboxProps> = ({
  onPress,
  side = 'left',
}) => {
  return (
    <Icon
      color={colors.BLACK}
      name="message-circle"
      size={20}
      style={[styles.icon, getSideStyle(side)]}
      onPress={onPress}
    />
  );
};

interface HeaderHomeProps {
  onPress: () => void;
  side?: IconSide;
  direction?: IconDirection;
}

const HeaderHome: FunctionComponent<HeaderHomeProps> = ({
  onPress,
  side = 'left',
  direction = 'left',
}) => {
  return (
    <Icon
      color={colors.BLACK}
      name={`chevron-${direction}`}
      size={20}
      style={[styles.icon, getSideStyle(side)]}
      onPress={onPress}
    />
  );
};

interface HeaderSettingsProps {
  onPress: () => void;
  side?: IconSide;
}

const HeaderSettings: FunctionComponent<HeaderSettingsProps> = ({
  onPress,
  side = 'left',
}) => {
  return (
    <Icon
      color={colors.BLACK}
      name="settings"
      size={20}
      style={[styles.icon, getSideStyle(side)]}
      onPress={onPress}
    />
  );
};

interface HeaderBackProps {
  onPress: () => void;
  side?: IconSide;
}

const HeaderBack: FunctionComponent<HeaderBackProps> = ({
  onPress,
  side = 'left',
}) => {
  return (
    <Icon
      color={colors.BLACK}
      name="x"
      size={20}
      style={[styles.icon, getSideStyle(side)]}
      onPress={onPress}
    />
  );
};

export {
  HeaderTitle,
  HeaderProfile,
  HeaderMailbox,
  HeaderHome,
  HeaderSettings,
  HeaderBack,
};
