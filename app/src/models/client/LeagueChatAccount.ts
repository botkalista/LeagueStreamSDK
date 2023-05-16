

export type NumericString = `${number}` | "";
export type LeagueDivision = 'I' | 'II' | 'III' | 'IV' | 'V';
export type LeagueQueue = 'RANKED_SOLO_5x5' | string;
export type LeagueTier = 'SILVER' | 'GOLD' | string;


export namespace LeagueChatTypes {
    export type Availability = 'away' | 'dnd' | 'online' | string;
    export type GameTag = 'EUW' | string;
    export type Platform = 'EUW1' | string;

    export type PUUID = `${string}-${string}-${string}-${string}-${string}`;
    export type Id = `${PUUID}@${string}.pvp.net`;

    export type GameStatus = 'outOfGame' | string;
    export type Regalia = `{"bannerType":${number},"crestType":${number},"selectedPrestigeCrest":${number}}`;
    export type Patchline = 'live' | string;

    export type Product = 'league_of_legends' | string;

}


export type LeagueChatAccount = {
    availability: LeagueChatTypes.Availability,
    gameName: string,
    gameTag: LeagueChatTypes.GameTag,
    icon: number,
    id: LeagueChatTypes.Id,
    lastSeenOnlineTimestamp: number,
    lol: {
        championId: NumericString,
        companionId: NumericString,
        damageSkinId: NumericString,
        gameQueueType: string,
        gameStatus: string,
        iconOverride: NumericString,
        level: NumericString,
        mapId: NumericString,
        mapSkinId: NumericString,
        masteryScore: NumericString,
        puuid: LeagueChatTypes.Id,
        rankedLeagueDivision: LeagueDivision,
        rankedLeagueQueue: LeagueQueue,
        rankedLeagueTier: LeagueTier,
        rankedLosses: NumericString,
        rankedSplitRewardLevel: NumericString,
        rankedWins: NumericString,
        regalia: LeagueChatTypes.Regalia,
        skinVariant: string,
        skinname: string
    },
    name: string,
    obfuscatedSummonerId: number,
    patchline: LeagueChatTypes.Patchline,
    pid: LeagueChatTypes.Id,
    platformId: LeagueChatTypes.Platform,
    product: LeagueChatTypes.Product,
    productName: string,
    puuid: LeagueChatTypes.PUUID,
    statusMessage: string,
    summary: string,
    summonerId: number,
    time: number
}