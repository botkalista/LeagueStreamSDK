
import ws from 'ws';
import { ClientConnectionData } from '../../models/client/ClientConnectionData';

type EventData = { data: any, eventType: 'Update' | string, uri: string }

type Handler = {
    eventType: EventData['eventType'] | '*',
    uri: string | '*',
    callback: (e: EventData) => any
};

export class ClientEventListener {
    private socket: ws;
    private handlers: Handler[] = [];
    constructor(private connectionData: ClientConnectionData) { }

    listen() {
        this.socket = new ws(`wss://127.0.0.1:${this.connectionData.port}`, {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('riot:' + this.connectionData.token).toString('base64')
            }
        });
        this.socket.onopen = () => {
            this.socket.send(`[5,"OnJsonApiEvent"]`);
        }
        this.socket.onmessage = message => {
            this.handleEvent(message.data.toString());
        }
    }

    private handleEvent(message: string) {
        if (message.length == 0) return;
        const [num, event, messageData] = JSON.parse(message);
        const { data, eventType, uri } = messageData as EventData;


        for (const handler of this.handlers) {
            if (handler.eventType != '*' && handler.eventType != eventType) continue;
            if (handler.uri != '*' && handler.uri != uri) continue;
            handler.callback(messageData);
        }
    }

    on(eventType: EventData['eventType'] | '*', uri: string | '*', callback: (data: EventData) => any) {
        const handler: Handler = { eventType, uri, callback }
        this.handlers.push(handler);
        return handler;
    }

    close() {
        this.socket.close();
    }

}