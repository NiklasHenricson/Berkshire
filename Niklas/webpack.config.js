var path = require('path');
var webpack = require('webpack');

module.exports = function (env) {

    env = env || {};
    var isProd = env.NODE_ENV === 'development';

    // Setup base config for all environments
    var config = {
        entry: {
            main: './Client/js/main'
        },
        output: {
            path: path.join(__dirname, 'wwwroot/dist'),
            filename: 'main.js'
        },
        devtool: 'eval-source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        plugins: [
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' })
        ],
        module: {
            rules: [
                //{ test: /\.css?$/, use: ['style-loader', 'css-loader'] },
                //{ test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
                //{ test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        }
    }

    // Alter config for prod environment
    if (isProd) {
        config.devtool = 'source-map';
        config.plugins = config.plugins.concat([
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            })
        ]);
    }

    return config;
};