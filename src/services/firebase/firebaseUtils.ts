import { UserData } from '@cocorico/constants/types';

export const assert = (value: any, error?: string) => {
  if (!value) {
    throw new Error(error);
  }
};

export const normalizeUser = (id: string, user: any): UserData => {
  return {
    id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    description: user?.description,
    age: user?.age,
    pictures: user?.pictures,
    likes: user?.likes,
  };
};

export const getDocFromReference = async (
  collection: any,
  references: Array<any>,
) => {
  const output = references.map((ref) => collection.doc(ref).get());
  const result = await Promise.all(output);
  return result.map((elem) => elem.data());
};
