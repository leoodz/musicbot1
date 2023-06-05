const { Player } = require('discord-player');
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { YouTubeExtractor } = require("@discord-player/extractor");
global.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');

global.player = new Player(client, client.config.opt.discordPlayer);
player.extractors.loadDefault()

require('./src/loader');

client.login(client.config.app.token);