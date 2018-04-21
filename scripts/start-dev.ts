import * as webpack from 'webpack';

import devConfig from '../config/webpack.dev.conf';

webpack(devConfig).watch({
    aggregateTimeout: 300
}, (err: Error, stats: any) => {
    console.log(err);
});
