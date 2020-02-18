module.exports =  () => {
  // test env is not valid, default to development
  process.env.NODE_ENV = process.env.NODE_ENV === "test" ? "development" : process.env.NODE_ENV;
};
