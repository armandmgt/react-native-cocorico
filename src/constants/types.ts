/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
export type SwitchNavigatorKey = 'SPLASH' | 'AUTH' | 'APP';
export type AuthStatus = 'LOADING' | 'LOGGED_IN' | 'LOGGED_OUT';
export type AppStatus = 'LOADING' | 'LOADED';

export interface Profile {
  firstName: string;
  lastName: string;
  age: number | undefined;
  description: string | undefined;
}

export interface UserImages {
  pictures: string[];
}

export interface UserData extends Profile, UserImages {
  id: string;
  likes: string[] | undefined;
}

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type FormatKeywordsValue<Keys, Multipliers> = {
  [Key in (keyof Keys) as `${Key}${Multipliers}`]: Keys[Key]
};

export type FormatMultipliers<T extends (string | number | boolean | bigint)[]> = 
  T extends [unknown, ...infer U] ? [Join<Split<`${T[0]}`, '.'>, '_'>, ...FormatMultipliers<U>] : T;

type Split<S extends string, D extends string> =
    string extends S ? string[] :
    S extends '' ? [] :
    S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] :
    [S];

type Join<T extends (string | number | boolean | bigint)[], D extends string> =
    T extends [] ? '' :
    T extends [unknown] ? `${T[0]}` :
    T extends [unknown, ...infer U] ? `${T[0]}${D}${Join<U, D>}` :
    string;