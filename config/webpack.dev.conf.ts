import * as path from 'path';
import * as StartServerPlugin from "start-server-webpack-plugin";
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals'

export default {
    mode: 'development',
    entry: [
        // 'webpack/hot/poll?1000',
        'webpack/hot/signal',
        path.resolve(__dirname, '../server/app.ts')
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "app.js",
        libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals({
        whitelist: ['webpack/hot/signal']
        // whitelist: ['webpack/hot/poll?1000']
    })],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    'env',
                                    {
                                        "modules": false
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            }
        ]
    },
    target: "node",
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new StartServerPlugin({
            name: 'app.js',
            signal: true, // 添加这个貌似可以热加载，但服务更新一次就挂了
            nodeArgs: ['--inspect']
        })
    ],
}