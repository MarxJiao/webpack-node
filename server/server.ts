import * as http from 'http';
import app from './app';

// app.callback() 会返回一个能够通过http.createServer创建server的函数，类似express和connect。
let currentApp = app.callback();
// 创建server
const server = http.createServer(currentApp);
server.listen(3000);

// 热加载
if (module.hot) {
    // 监听./app.ts
    module.hot.accept('./app.ts', () => {
        // 如果有改动，就使用新的app来处理请求
        server.removeListener('request', currentApp);
        currentApp = app.callback();
        server.on('request', currentApp);
    });
}