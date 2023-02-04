const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const { withModuleFederation } = require('@nrwl/react/module-federation');

const baseConfig = require('./module-federation.config');

const config111 = {
  ...baseConfig,
};

//Nx plugins for webpack to build config object from Nx options and context.
module.exports = composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(config111)
);

// module.exports = composePlugins(
//   withNx(),
//   withModuleFederation(config111),
//   (config, { options, context }) => {
//
//   // customize webpack config here
//     //config.optimization.runtimeChunk = false;
//     //config.output = {publicPath: 'auto'};
//    // config.mode = 'development';
//     //config.stats.chunks = false;
//    // config.entry = '/Users/tanyad/Dev/virtual-store/virtual-store/apps/items/src/main.ts'
//
//     config.output = {
//       ...config.output,
//       scriptType: 'text/javascript'
//     }
//
//     console.log(config.output)
//   return config;
// });
