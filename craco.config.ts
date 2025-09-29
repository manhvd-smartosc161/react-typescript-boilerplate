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
              // Ant Design
              antd: {
                test: /[\\/]node_modules[\\/]antd[\\/]/,
                name: 'antd',
                chunks: 'all',
                priority: 20,
              },
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

        // Enable tree shaking for Ant Design
        webpackConfig.resolve.mainFields = ['module', 'main'];
      }

      return webpackConfig;
    },
  },
  babel: {
    plugins: [
      // Enable tree shaking for Ant Design
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        },
        'antd',
      ],
      // Enable tree shaking for Ant Design icons
      [
        'import',
        {
          libraryName: '@ant-design/icons',
          libraryDirectory: 'es/icons',
          camel2DashComponentName: false,
        },
        '@ant-design/icons',
      ],
    ],
  },
};
