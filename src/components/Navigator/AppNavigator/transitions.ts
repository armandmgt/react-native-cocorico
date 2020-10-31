import {
  StackNavigationOptions,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

export interface Transition {
  gestureDirection?: StackNavigationOptions['gestureDirection'];
  cardStyleInterpolator?: StackNavigationOptions['cardStyleInterpolator'];
  headerStyleInterpolator?: StackNavigationOptions['headerStyleInterpolator'];
}

export const fromLeft: Transition = {
  gestureDirection: 'horizontal-inverted',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideRight,
};

export const fromRight: Transition = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
};

export const fromBottom: Transition = {
  gestureDirection: 'vertical',
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};
