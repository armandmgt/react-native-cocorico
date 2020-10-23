export type Screens = {
  Account: undefined;
  EnterPassword: { email: string };
  ForgotPassword: { email: string };
  CreatePassword: { email: string };
  CreateProfile: { email: string };
};

export type Navigators = {
  AuthNavigator: Navigatable<
    'Account' | 'LoginNavigator' | 'RegisterNavigator'
  >;
  LoginNavigator: Navigatable<'EnterPassword' | 'ForgotPassword'>;
  RegisterNavigator: Navigatable<'CreatePassword' | 'CreateProfile'>;
};

type Navigatable<T> = T extends keyof Screens
  ? ScreenParams<T>
  : T extends keyof Navigators
  ? NavigatorParams<T>
  : never;

type ScreenParams<T extends keyof Screens> = Screens[T] extends undefined
  ? { screen: T; params?: Screens[T] }
  : { screen: T; params: Screens[T] };

type NavigatorParams<
  T extends keyof Navigators
> = Navigators[T] extends undefined
  ? { screen: T; params?: Navigators[T] }
  : { screen: T; params: Navigators[T] };

export type NavigationParams = Screens & Navigators;

export type TypedNavigatorParams<T extends keyof Navigators> = Pick<
  NavigationParams,
  NavigationParams[T]['screen']
>;
