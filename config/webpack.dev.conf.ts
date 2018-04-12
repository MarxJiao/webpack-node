import * as path from 'path';
import * as StartServerPlugin from "start-server-webpack-plugin";

export default {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, '../server/app.ts')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js",
        libraryTarget: "commonjs"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                }
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
    ],
}