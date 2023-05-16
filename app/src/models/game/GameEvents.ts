
export type GameEvent<EVTNAME extends EventName = EventName> = {
    EventId: number;
    EventName: EVTNAME;
    EventTime: number;
}

export type EventName = 'ChampionKill' | 'FirstBlood' |
    'FirstBrick' | 'Ace' | 'TurretKilled' |
    'DragonKill' | 'HeraldKill' | 'BaronKill' |
    'MultiKill' | 'GameStart';

export type ChampionKillGameEvent = GameEvent<'ChampionKill'> & {
    KillerName: string;
    VictimName: string;
}

export type FirstBloodGameEvent = GameEvent<'FirstBlood'> & {
    Recipient: string
}

export type FirstTowerGameEvent = GameEvent<'FirstBrick'> & {
    KillerName: string
}

export class GameEvents {
    constructor(public events: GameEvent[]) { }

    getKills(playerName?: string) {
        const kills = this.events.filter(e => e.EventName === 'ChampionKill') as ChampionKillGameEvent[];
        if (!playerName) return kills;
        const playerKills = kills.filter(e => e.KillerName == playerName);
        return playerKills;
    }

    getDeaths(playerName?: string) {
        const kills = this.events.filter(e => e.EventName === 'ChampionKill') as ChampionKillGameEvent[];
        if (!playerName) return kills;
        const playerKills = kills.filter(e => e.VictimName == playerName);
        return playerKills;
    }

    getFirstBlood() {
        return this.events.find(e => e.EventName === 'FirstBlood') as FirstBloodGameEvent;
    }

    getFirstTower() {
        return this.events.find(e => e.EventName === 'FirstBrick') as FirstTowerGameEvent;
    }

}