module.exports = function init(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"]
  };
};
