import * as webpack from 'webpack';

import WebpackConfig from '../config/Webpack.config';

const buildConfig = new WebpackConfig('production');

webpack(buildConfig).run((err: Error) => {
    console.log(err);
});
