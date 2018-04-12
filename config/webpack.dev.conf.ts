import * as path from 'path';
import * as StartServerPlugin from "start-server-webpack-plugin";
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals'

export default {
    mode: 'development',
    entry: [
        'webpack/hot/poll?1000',
        path.resolve(__dirname, '../server/app.ts')
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "app.js",
        libraryTarget: "commonjs"
    },
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
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
    plugins: [
        new StartServerPlugin({
            name: 'app.js',
            nodeArgs: ['--inspect']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
}