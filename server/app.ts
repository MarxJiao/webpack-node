import * as http from 'http';
import * as path from 'path';
import server from './server';

let currentApp = server.callback();

const app = http.createServer(currentApp);
app.listen(3000);
declare var module: any;


if (module.hot) {
    const list = [
        './server/server.ts',
        // './server/app.ts'
    ]
    module.hot.accept(list, () => {
        app.removeListener('request', currentApp);
        console.log("after `removeListener`", app.listeners("request").length);
        currentApp = server.callback();
        console.log(111, currentApp)
        app.on('request', currentApp);
        console.log("after `on`", app.listeners("request").length);
        
    });
    // module.hot.addStatusHandler(status => {
    //     console.log(status);
    //     if (status === 'ready') {
    //         module.hot.apply();
    //     }
    //     // React to the current status...
    // })
}