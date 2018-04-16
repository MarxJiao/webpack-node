import * as http from 'http';
import server from './server';

let currentApp = server.callback();

const app = http.createServer(currentApp);
app.listen(3000);
declare var module: any;


if (module.hot) {
    const list = [
        './server/server.ts'
    ]
    module.hot.accept(list, () => {
        removeAndAdd();
    });
}

function removeAndAdd() {
    app.removeListener('request', currentApp);
    console.log("after `removeListener`", app.listeners("request").length);
    currentApp = server.callback();
    console.log(111, currentApp)
    app.on('request', currentApp);
    console.log("after `on`", app.listeners("request").length);
}

function CloseAndOpen() {
    removeAndAdd();
    app.close(() => {
        console.log('closed');
        app.listen(3000);
    });
}