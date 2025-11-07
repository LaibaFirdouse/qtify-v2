const webpack = require('webpack');
const { override } = require('customize-cra');

module.exports = override(
  (config) => {
    // 1. Add polyfills for Node.js core modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      util: require.resolve('util'),
      url: require.resolve('url'),
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      zlib: require.resolve('browserify-zlib'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      
      // Axios dependencies that should be treated as external/disabled
      http2: false,
      net: false,
      tls: false,
      fs: false, 
      // Ensure "buffer" is not resolved to "buffer/"
      buffer: require.resolve('buffer/'), 
    };

    // 2. Add necessary plugins for global variables (Buffer, process)
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    );
    
    // 3. Address the specific Node module type handling for Axios
    // We explicitly tell Webpack to use the browser field for Axios to avoid the Node adapter
    config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'axios': require.resolve('axios'),
    };
    
    // Optionally suppress source map warnings
    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
  }
);