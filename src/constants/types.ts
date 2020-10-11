export type StackNavigator = 'SPLASH' | 'AUTH' | 'APP';
export type AuthStatus = 'LOADING' | 'LOGGED_IN' | 'LOGGED_OUT';
export type AppStatus = 'LOADING' | 'LOADED';

export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] };
}[keyof ParamList];
