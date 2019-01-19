import * as path from 'path';
import * as StartServerPlugin from "start-server-webpack-plugin";
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';
import {Configuration, ExternalsElement} from 'webpack';

class WebpackConfig implements Configuration {
    target: Configuration['target'] = "node";
    mode: Configuration['mode'] = 'production';
    entry = [path.resolve(__dirname, '../server/server.ts')];
    output = {
        path: path.resolve(__dirname, '../dist'),
        filename: "server.js"
    };
    externals: ExternalsElement[] = [];
    module = {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile: path.resolve(__dirname, './tsconfig.json')
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    };
    resolve = {
        extensions: [".ts", ".js", ".json"],
    };
    // 开发环境也使用NoEmitOnErrorsPlugin
    plugins = [new webpack.NoEmitOnErrorsPlugin()];
    constructor(mode: Configuration['mode']) {
        this.mode = mode;
        if (mode === 'development') {
            this.entry.push('webpack/hot/signal');
            this.externals.push(
                nodeExternals({
                    whitelist: ['webpack/hot/signal']
                })
            );
            const devPlugins = [
                new webpack.HotModuleReplacementPlugin(),
                new StartServerPlugin({
                    name: 'server.js',
                    signal: true,
                    nodeArgs: ['--inspect']
                }),
            ]
            this.plugins.push(...devPlugins);
        }
    }
}

export default WebpackConfig;