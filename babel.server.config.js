module.exports = function (api) {
  api.cache(false);
  return {
    presets: ["@babel/env", "@babel/preset-typescript"],
    plugins: [],
  };
};
