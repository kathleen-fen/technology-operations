export const isDevEnvironment = () =>
  process.env.NODE_ENV === "development" ? true : false;
