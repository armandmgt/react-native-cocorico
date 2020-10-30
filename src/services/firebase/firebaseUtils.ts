export const assert = (value: any, error?: string) => {
  if (!value) {
    throw new Error(error);
  }
};

export const normalizeUser = (user: any) => {
  return {
    firstName: user?.firstName,
    lastName: user?.lastName,
  };
};
