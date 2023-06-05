module.exports = {
    app: {
        token: 'NzgxOTkzODU1Njk1MTkyMDc1.GaN2Rt.bTds8DzEzsgK-hF11-OpFhcbOAlYvoGC2PR-m4',
        playing:'by Lou',
        global: true,
        guild: '696496281761349682',
        ExtraMessages: false,
        loopMessage: false,

    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        spotifyBridge: true,
        volume: 75,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
