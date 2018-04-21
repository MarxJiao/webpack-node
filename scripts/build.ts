import * as webpack from 'webpack';

import devConfig from '../config/webpack.prod.conf';

webpack(devConfig).run((err: Error) => {
    console.log(err);
});
