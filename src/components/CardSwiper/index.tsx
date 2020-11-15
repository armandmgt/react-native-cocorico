import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { UserData } from '@cocorico/constants/types';

import Card from './card';
import TouchableCard from './touchableCard';

const { width, height } = Dimensions.get('window');
const toRadians = (angle) => angle * (Math.PI / 180);
const rotatedWidth =
  width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

const {
  add,
  multiply,
  neq,
  spring,
  cond,
  eq,
  lessThan,
  greaterThan,
  and,
  call,
  set,
  clockRunning,
  startClock,
  stopClock,
  concat,
  interpolate,
  Extrapolate,
} = Animated;

function runSpring(
  clock: Animated.Clock,
  value: Animated.Adaptable<number>,
  dest: Animated.Node<number>,
) {
  const state = {
    finished: new Animated.Value(0),
    velocity: new Animated.Value(0),
    position: new Animated.Value(0),
    time: new Animated.Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Animated.Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

interface Props {
  profiles: UserData[];
  handleSwiped: (liked: boolean) => void;
}

const CardSwiper: FunctionComponent<Props> = ({ profiles, handleSwiped }) => {
  const animation = useMemo(
    () => ({
      translationX: new Animated.Value(0),
      translationY: new Animated.Value(0),
      velocityX: new Animated.Value(0),
      offsetY: new Animated.Value(0),
      offsetX: new Animated.Value(0),
      gestureState: new Animated.Value(State.UNDETERMINED),
    }),
    [],
  );

  const onGestureEvent = useMemo(() => {
    const { translationX, translationY, velocityX, gestureState } = animation;

    return Animated.event(
      [
        {
          nativeEvent: {
            translationX,
            translationY,
            velocityX,
            state: gestureState,
          },
        },
      ],
      { useNativeDriver: true },
    );
  }, [animation]);

  const onSwipped = useCallback(
    ([translationX]) => {
      const liked = translationX > 0;
      handleSwiped(liked);
    },
    [handleSwiped],
  );

  const initAnimation = useCallback(() => {
    const clockX = new Animated.Clock();
    const clockY = new Animated.Clock();
    const {
      translationX,
      translationY,
      velocityX,
      gestureState,
      offsetY,
      offsetX,
    } = animation;
    gestureState.setValue(State.UNDETERMINED);
    translationX.setValue(0);
    translationY.setValue(0);
    velocityX.setValue(0);
    offsetY.setValue(0);
    offsetX.setValue(0);

    const finalTranslateX = add(translationX, multiply(0.2, velocityX));
    const translationThreshold = width / 4;
    const snapPoint = cond(
      lessThan(finalTranslateX, -translationThreshold),
      -rotatedWidth,
      cond(greaterThan(finalTranslateX, translationThreshold), rotatedWidth, 0),
    );

    const translateX = cond(
      eq(gestureState, State.END),
      [
        set(translationX, runSpring(clockX, translationX, snapPoint)),
        set(offsetX, translationX),
        cond(and(eq(clockRunning(clockX), 0), neq(translationX, 0)), [
          call([translationX], onSwipped),
        ]),
        translationX,
      ],
      cond(
        eq(gestureState, State.BEGAN),
        [stopClock(clockX), translationX],
        translationX,
      ),
    );
    const translateY = cond(
      eq(gestureState, State.END),
      [
        set(translationY, runSpring(clockY, translationY, 0)),
        set(offsetY, translationY),
        translationY,
      ],
      cond(
        eq(gestureState, State.BEGAN),
        [stopClock(clockY), translationY],
        translationY,
      ),
    );
    return { x: translateX, y: translateY };
  }, [animation, onSwipped]);

  const translate = useMemo(initAnimation, [initAnimation]);

  useEffect(() => {
    initAnimation();
  }, [profiles, initAnimation]);

  const rotateZ = concat(
    interpolate(translate.x, {
      inputRange: [-width / 2, width / 2],
      outputRange: [15, -15],
      extrapolate: Extrapolate.CLAMP,
    }),
    'deg',
  );
  const likeOpacity = interpolate(translate.x, {
    inputRange: [0, width / 4],
    outputRange: [0, 1],
  });
  const nopeOpacity = interpolate(translate.x, {
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
  });
  const style = {
    ...StyleSheet.absoluteFillObject,
    zIndex: 3,
    transform: [
      { translateX: translate.x },
      { translateY: translate.y },
      { rotateZ },
    ],
  };

  const [lastProfile, ...otherProfiles] = profiles;

  const renderCards = () => {
    return otherProfiles.reverse().map((profile, index) => {
      console.log(
        'DBG :',
        profile.firstName,
        index === otherProfiles.length - 1,
      );
      return (
        <Card
          key={profile.id}
          picture={profile.pictures?.[0]}
          shouldDisplay={index === otherProfiles.length - 1}
          {...{ profile }}
        />
      );
    });
  };

  return (
    !!lastProfile && (
      <View style={styles.container}>
        {renderCards()}
        <PanGestureHandler
          onHandlerStateChange={onGestureEvent}
          {...{ onGestureEvent }}
        >
          <Animated.View {...{ style }}>
            <TouchableCard
              key={lastProfile.id}
              profile={lastProfile}
              {...{ likeOpacity, nopeOpacity }}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
});

export default CardSwiper;
