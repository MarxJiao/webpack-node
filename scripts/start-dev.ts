import * as webpack from 'webpack';

import devConfig from '../config/webpack.dev.conf';

webpack(devConfig).watch({
    aggregateTimeout: 300,
    poll: 1000,
    hot: true,
    inline: true
}, (err: Error, stats: any) => {
    
});
