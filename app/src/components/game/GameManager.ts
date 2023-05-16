
import fetch from 'node-fetch';

import { GameEvent, GameEvents } from "../../models/game/GameEvents";
import type { GameScore } from "../../models/game/GameScore";


export class GameManager {

    private static BASE = 'https://127.0.0.1:2999/liveclientdata';

    constructor() { }

    private static async request<T>(path: string, json: boolean = true): Promise<T | false> {
        try {
            const res = await fetch(this.BASE + path);
            const data = json ? await res.json() : await res.text();
            return data as T;
        } catch (ex) {
            return false;
        }
    }

    static async getPlayerName() {
        const res = await this.request<string>('/activeplayername', false);
        if (res) return res.replace(/"/g, '');
        return res as false;
    }

    static async getPlayerScore(playerName: string) {
        return await this.request<GameScore>('/playerscores?summonerName=' + encodeURI(playerName));
    }

    static async getGameEvents(expectedID: number = 0) {
        const res = await this.request<{ Events: GameEvent[] }>('/eventdata?eventID=' + expectedID);
        if (res) return new GameEvents(res.Events);
        return res as false;
    }

}