import * as http from 'http';
import * as path from 'path';
import server from './server';


const app = http.createServer(server.callback()).listen(3000);
declare var module: any;
let currentApp = server.callback();

if (module.hot) {
    module.hot.accept(path.resolve(__dirname, './app.ts'), () => {
        app.removeListener('request', currentApp)
        app.on('request', server.callback())
        currentApp = server.callback();
    })
}