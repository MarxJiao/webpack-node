import * as http from 'http';
import app from './app';

let currentApp = app.callback();
const server = http.createServer(currentApp);
server.listen(3000);

if (module.hot) {
    module.hot.accept('./app.ts', () => {
        server.removeListener('request', currentApp);
        currentApp = app.callback();
        server.on('request', currentApp);
    });
}
