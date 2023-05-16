
import fetch from 'node-fetch';
import child from 'node:child_process';
import { ClientConnectionData } from '../../models/client/ClientConnectionData';
import { LeagueChatAccount } from '../../models/client/LeagueChatAccount';
import { ClientEventListener } from './ClientEventListener';


export class ClientManager {
    private static connectionData: ClientConnectionData;
    private static getConnectionData(): ClientConnectionData {
        const commandLine = child.execSync(`wmic process where name='LeagueClientUx.exe' get CommandLine`).toString();
        const [all, token, port] = commandLine.match(/--remoting-auth-token=(.*?)".*?--app-port=(.*?)"/);
        this.connectionData = { token, port: parseInt(port) };
        return this.connectionData;
    }
    static init() { this.getConnectionData(); }

    private static async request<T>(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any, json: boolean = true, jsonRequest: boolean = true) {
        try {
            const headers = {}
            if (body && jsonRequest) headers['Content-Type'] = 'application/json';
            headers['Authorization'] = 'Basic ' + Buffer.from('riot:' + this.connectionData.token).toString('base64');
            const res = await fetch(`https://127.0.0.1:${this.connectionData.port}${path}`, {
                headers,
                method,
                body: body ? JSON.stringify(body) : undefined
            });
            const data = json ? await res.json() : await res.text();
            return data as T;
        } catch (ex) {
            return false;
        }
    }
    private static async GET<T>(path: string, json: boolean = true) {
        return this.request<T>(path, 'GET', undefined, json, false);
    }
    private static async POST<T>(path: string, body?: any, json: boolean = true) {
        return this.request<T>(path, 'POST', body, json);
    }

    static createListener() {
        return new ClientEventListener(this.connectionData);
    }

    static async getConnectedAccount() {
        return await this.GET<LeagueChatAccount>('/lol-chat/v1/me');
    }

}
