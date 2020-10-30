/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

export const useValues = <Values,>(
  defaultValues: Values,
): [
  Values,
  <T extends keyof Values>(target: T) => (value: Values[T]) => void,
] => {
  const [values, updateValues] = useState<Values>(defaultValues);

  const updateValue = <T extends keyof Values>(target: T) => (
    value: Values[T],
  ): void => {
    updateValues((pinputs) => ({
      ...pinputs,
      [target]: value,
    }));
  };

  return [values, updateValue];
};
