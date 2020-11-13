export const assert = (value: any, error?: string) => {
  if (!value) {
    throw new Error(error);
  }
};

export const normalizeUser = (user: any) => {
  return {
    firstName: user?.firstName,
    lastName: user?.lastName,
    profilePicUrl: user?.profilePicUrl,
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
