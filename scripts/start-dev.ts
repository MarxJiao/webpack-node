import * as webpack from 'webpack';

import WebpackConfig from '../config/Webpack.config';

const devConfig = new WebpackConfig('development');

webpack(devConfig).watch({
    aggregateTimeout: 300
}, (err: Error) => {
    console.log(err);
});
