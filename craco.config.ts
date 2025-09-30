const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@apis': path.resolve(__dirname, 'src/apis'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    configure: (webpackConfig: any, { env }: { env: string }) => {
      // Ignore source map warnings for styled-components
      webpackConfig.module.rules = webpackConfig.module.rules.map(
        (rule: any) => {
          if (rule.loader && rule.loader.includes('source-map-loader')) {
            return {
              ...rule,
              exclude: /node_modules/,
            };
          }
          return rule;
        },
      );

      // Suppress webpack warnings about missing source maps
      webpackConfig.ignoreWarnings = [
        /Failed to parse source map/,
        /ENOENT: no such file or directory/,
      ];

      if (env === 'production') {
        // Optimize bundle splitting
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              // Vendor libraries
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
                priority: 10,
              },
              // Removed Ant Design configuration
              // React libraries
              react: {
                test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
                name: 'react',
                chunks: 'all',
                priority: 30,
              },
              // Highcharts
              highcharts: {
                test: /[\\/]node_modules[\\/]highcharts[\\/]/,
                name: 'highcharts',
                chunks: 'all',
                priority: 25,
              },
              // Common components
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                priority: 5,
                reuseExistingChunk: true,
              },
            },
          },
        };

        // Removed Ant Design tree shaking configuration
      }

      return webpackConfig;
    },
  },
  babel: {
    plugins: [
      // Removed Ant Design babel plugins
    ],
  },
};
