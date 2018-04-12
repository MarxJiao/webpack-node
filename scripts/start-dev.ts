import * as webpack from 'webpack';

import devConfig from '../config/webpack.dev.conf';

// webpack(devConfig).watch({
//     // Example watchOptions
//     aggregateTimeout: 300,
//     poll: 1000
//   }, (err: Error, stats: any) => {
//     // Print watch/build result here...
//     console.log(stats);
//   });
webpack(devConfig).run((err: Error, stats: any) => {
    // Print watch/build result here...
    console.log(stats);
  });