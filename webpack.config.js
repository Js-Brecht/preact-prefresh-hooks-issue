const path = require('path');
const autoprefixer = require('autoprefixer');
const flexbugs = require('postcss-flexbugs-fixes');

const {
   HotModuleReplacementPlugin,
   SourceMapDevToolPlugin,
} = require('webpack');
const PreactRefreshPlugin = require('@prefresh/webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


let postcssId = 1;

module.exports = ({
   context: `${__dirname}/src`,
   entry: {
      app: [
         "core-js/modules/es.promise",
         "core-js/modules/es.array.iterator",
         "./index"
      ]
   },
   output: {
      filename: '[name].js',
      chunkFilename: "[name]-[contenthash].js",
      devtoolModuleFilenameTemplate: (info) =>
         path.resolve(info.absoluteResourcePath).replace(/\\/g, `/`),
      crossOriginLoading: 'anonymous',
      pathinfo: true,
      path: `${__dirname}/dist`,
      publicPath: "/"
   },
   mode: "development",
   devtool: 'eval-source-map',
   devServer: {
       contentBase: path.join(__dirname, 'dist'),
       publicPath: '/',
       compress: true,
       port: 9000,
       // http2: true,
       writeToDisk: true,
       liveReload: true,
       inline: true,
       injectClient: true,
       injectHot: true,
       hot: true,
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: require.resolve('babel-loader'),
                  options: {
                     presets: [
                        require.resolve('./babel-preset')
                     ]
                  }
               }
            ]
         },
         {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: require.resolve('babel-loader'),
                  options: {
                     presets: [
                        require.resolve('./babel-preset')
                     ]
                  }
               },
               {
                  loader: require.resolve('ts-loader'),
                  options: {},
               }
            ]
         },
         {
            oneOf: [
               {
                  test: /\.module\.css$/,
                  sideEffects: false,
                  use: [
                     {
                        loader: require.resolve('style-loader'),
                        options: {
                           injectType: 'styleTag',
                           attributes: {
                               id: 'style-loader',
                           },
                           insert: 'head',
                           esModule: false,           
                        }
                     },
                     {
                        loader: require.resolve('@teamsupercell/typings-for-css-modules-loader'),
                        options: {
                           disableLocalsExport: true
                        }
                     },
                     {
                        loader: require.resolve('css-loader'),
                        options: {
                           url: true,
                           import: true,
                           sourceMap: true,
                           esModule: false,
                           localsConvention: "dashesOnly",
                           modules: {
                              mode: "local",
                              exportGlobals: true,
                              localIdentName: '[path][name]__[local]'
                           },
                           importLoaders: 1
                        }
                     },
                     {
                        loader: require.resolve('postcss-loader'),
                        options: {
                           ident: `postcss-${postcssId+1}`,
                           sourceMap: false,
                           plugins: [
                              flexbugs,
                              autoprefixer({ overrideBrowsersList: [`>0.25%`, `not dead`], flexbox: 'no-2009' }),
                           ]
                        }
                     }
                  ]
               },
               {
                  test: /\.css$/,
                  sideEffects: true,
                  exclude: /node_modules/,
                  use: [
                     {
                        loader: require.resolve('style-loader'),
                        options: {
                           injectType: 'styleTag',
                           attributes: {
                               id: 'style-loader',
                           },
                           insert: 'head',
                           esModule: false,           
                        }
                     },
                     {
                        loader: require.resolve('css-loader'),
                        options: {
                           url: true,
                           import: true,
                           sourceMap: true,
                           esModule: false,
                           importLoaders: 1
                        }
                     },
                     {
                        loader: require.resolve('postcss-loader'),
                        options: {
                           ident: `postcss-${postcssId+1}`,
                           sourceMap: false,
                           plugins: [
                              flexbugs,
                              autoprefixer({ overrideBrowsersList: [`>0.25%`, `not dead`], flexbox: 'no-2009' }),
                           ]
                        }
                     }
                  ]
               }
            ]
         },
         {
            oneOf: [
               {
                  test: /\.module\.s[ac]ss$/,
                  sideEffects: false,
                  use: [
                     {
                        loader: require.resolve('style-loader'),
                        options: {
                           injectType: 'styleTag',
                           attributes: {
                               id: 'style-loader',
                           },
                           insert: 'head',
                           esModule: false,           
                        }
                     },
                     {
                        loader: require.resolve('@teamsupercell/typings-for-css-modules-loader'),
                        options: {
                           disableLocalsExport: true
                        }
                     },
                     {
                        loader: require.resolve('css-loader'),
                        options: {
                           url: true,
                           import: true,
                           sourceMap: true,
                           esModule: false,
                           importLoaders: 3
                        }
                     },
                     {
                        loader: require.resolve('postcss-loader'),
                        options: {
                           ident: `postcss-${postcssId+1}`,
                           sourceMap: true,
                           plugins: [
                              flexbugs,
                              autoprefixer({ overrideBrowsersList: [`>0.25%`, `not dead`], flexbox: 'no-2009' }),
                           ]
                        }
                     },
                     {
                        loader: require.resolve('resolve-url-loader'),
                        options: {
                           sourceMap: true
                        }
                     },
                     {
                        loader: require.resolve('sass-loader'),
                        options: {
                           sourceMap: true
                        }
                     }
                  ]
               },
               {
                  test: /\.module\.s[ac]ss$/,
                  sideEffects: false,
                  use: [
                     {
                        loader: require.resolve('style-loader'),
                        options: {
                           injectType: 'styleTag',
                           attributes: {
                               id: 'style-loader',
                           },
                           insert: 'head',
                           esModule: false,           
                        }
                     },
                     {
                        loader: require.resolve('css-loader'),
                        options: {
                           url: true,
                           import: true,
                           sourceMap: true,
                           esModule: false,
                           importLoaders: 3
                        }
                     },
                     {
                        loader: require.resolve('postcss-loader'),
                        options: {
                           ident: `postcss-${postcssId+1}`,
                           sourceMap: true,
                           plugins: [
                              flexbugs,
                              autoprefixer({ overrideBrowsersList: [`>0.25%`, `not dead`], flexbox: 'no-2009' }),
                           ]
                        }
                     },
                     {
                        loader: require.resolve('resolve-url-loader'),
                        options: {
                           sourceMap: true
                        }
                     },
                     {
                        loader: require.resolve('sass-loader'),
                        options: {
                           sourceMap: true
                        }
                     }
                  ]
               },
            ]
         }
      ]
   },
   resolve: {
      extensions: [
         ".mjs",
         ".js",
         ".jsx",
         ".ts",
         ".tsx"
      ]
   },
   plugins: [
      new SourceMapDevToolPlugin({}),
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: 'index.html',
         inject: true,
         scriptLoading: 'defer',
         meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
         },
      }),
      new HotModuleReplacementPlugin(),
      // new ReactRefreshPlugin(),
      new PreactRefreshPlugin(),
      new CleanWebpackPlugin({
         cleanStaleWebpackAssets: true,
         protectWebpackAssets: true,
         cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist', '**', '*')],
      }),
   ]
})