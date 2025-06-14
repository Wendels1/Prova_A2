// esse arquivo é necessário para que o Expo funcione corretamente com o React Native Reanimated

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'], // ← ESSENCIAL!
  };
};