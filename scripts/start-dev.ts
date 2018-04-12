import * as webpack from 'webpack';

import devConfig from '../config/webpack.dev.conf';

webpack(devConfig).run((err: Error, stats: any) => {
    // ...
    console.log(stats)
});