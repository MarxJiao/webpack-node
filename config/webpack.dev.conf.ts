import * as path from 'path';
import * as StartServerPlugin from "start-server-webpack-plugin";
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals'

const config: webpack.Configuration = {
    mode: 'development',
    entry: [
        'webpack/hot/signal',
        path.resolve(__dirname, '../server/server.ts')
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "server.js"
    },
    externals: [nodeExternals({
        whitelist: ['webpack/hot/signal']
    })],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile: path.resolve(__dirname, './tsconfig.json')
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    target: "node",
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new StartServerPlugin({
            name: 'server.js',
            signal: true,
            nodeArgs: ['--inspect']
        }),
    ]
}

export default config 