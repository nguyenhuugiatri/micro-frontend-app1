const NextFederationPlugin = require('@module-federation/nextjs-mf');
const deps = require('./package.json').dependencies;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config, options) {
    const { isServer } = options;
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'app1',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            host: 'host@http://localhost:3000/_next/static/chunks/remoteEntry.js',
          },
          exposes: {
            './home': './pages/index',
          },
          shared: {
            next: {
              singleton: true,
              requiredVersion: deps.next,
            },
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: deps['react-dom'],
            },
            '@axieinfinity/dango': {
              singleton: true,
              requiredVersion: deps['@axieinfinity/dango'],
            },
            '@axieinfinity/dango-icons': {
              singleton: true,
              requiredVersion: deps['@axieinfinity/dango-icons'],
            },
          },
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
