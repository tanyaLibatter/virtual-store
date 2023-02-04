const coreLibraries = new Set([
  'react',
  'react-dom',
  'react-router-dom',
  '@virtual-store/shared/subscriptions',
]);

module.exports = {
  name: 'items',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (coreLibraries.has(libraryName)) {
      return defaultConfig;
    }
    // Returning false means the library is not shared.
    return false;
  },
};
