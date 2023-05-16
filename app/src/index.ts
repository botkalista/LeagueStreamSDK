process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


import { listen } from './components/server/Server';


listen();

// import { ClientManager } from "./components/client/ClientManager";
// const client = ClientManager;
// client.init();
// const listener = client.createListener();
// listener.listen();
// listener.on('*', '*', e => {
//     console.log(e.eventType + ' ' + e.uri);
// });