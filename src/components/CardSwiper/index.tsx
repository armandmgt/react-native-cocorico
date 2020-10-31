import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { init } from '@rematch/core';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import Card from './card';

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
  event,
  lessThan,
  greaterThan,
  and,
  call,
  set,
  clockRunning,
  startClock,
  stopClock,
  Clock,
  Value,
  concat,
  interpolate,
  Extrapolate,
} = Animated;

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
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

export type Profile = {
  id: string;
  name: string;
  age: number;
  profile: any;
};

interface Props {
  profiles: Profile[];
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
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

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

  const initAnimation = useCallback(() => {
    const clockX = new Clock();
    const clockY = new Clock();
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
          call([translationX], handleSwipped),
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
    setTranslate({ x: translateX, y: translateY });
  }, [animation, handleSwipped]);

  const handleSwipped = useCallback(
    ([translationX]) => {
      const liked = translationX > 0;
      handleSwiped(liked);
      initAnimation();
    },
    [handleSwiped, initAnimation],
  );

  useEffect(() => {
    initAnimation();
  }, [initAnimation]);

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
    zIndex: 900,
    transform: [
      { translateX: translate.x },
      { translateY: translate.y },
      { rotateZ },
    ],
  };

  const [lastProfile, ...otherProfiles] = profiles;

  console.log('Render :');

  const renderCards = () => {
    return otherProfiles
      .reverse()
      .map((profile) => <Card key={profile.id} {...{ profile }} />);
  };

  if (profiles.length === 0) return <Text>Plus Rien...</Text>;

  return (
    <View style={styles.container}>
      {renderCards()}
      <PanGestureHandler
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}
      >
        <Animated.View {...{ style }}>
          <Card profile={lastProfile} {...{ likeOpacity, nopeOpacity }} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
});

export default CardSwiper;
