const coreLibraries = new Set([
  'react',
  'react-dom',
  'react-router-dom',
  '@virtual-store/shared/subscriptions',
]);

module.exports = {
  name: 'cart',
  exposes: {
    './Cart': './src/components/Cart.tsx',
    './CartIcon': './src/components/CartIcon.tsx',
  },
  shared: (libraryName, defaultConfig) => {
    if (coreLibraries.has(libraryName)) {
      return defaultConfig;
    }
    // Returning false means the library is not shared.
    return false;
  },
};
