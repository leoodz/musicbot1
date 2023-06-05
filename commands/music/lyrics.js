const { EmbedBuilder } = require('discord.js');
const lyricsFinder = require("lyrics-finder");


module.exports = {
    name: 'lyrics',
    description: 'get lyrics for the current track',
    voiceChannel: true,

    async execute({ inter }) {

        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        try {

            var songTitle = queue.currentTrack.title;

            songTitle = songTitle.replace(/lyrics|lyric|lyrical|official music video|\(official music video\)|audio|official|official video|official video hd|official hd video|offical video music|\(offical video music\)|extended|hd|(\[.+\])/gi, "");

            const lyrics = await lyricsFinder(songTitle);

            if (!lyrics) return inter.reply({ content: `No lyrics found for ${queue.currentTrack.title}... try again ? ❌`, ephemeral: true });

            const embeds = [];
            for (let i = 0; i < lyrics.length; i += 4096) {
                const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 4096));
                embeds.push(new EmbedBuilder()
                    .setTitle(`Lyrics for ${queue.currentTrack.title}`)
                    .setDescription(toSend)
                    .setColor('#2f3136')
                    .setTimestamp()
                    .setFooter({ text: 'Music comes first - Made with heart by Zerio ❤️', iconURL: inter.member.avatarURL({ dynamic: true }) })
                );
            }
            return inter.reply({ embeds: embeds });

        } catch (error) {
            inter.reply({ content: `Error! Please contact Developers! | ❌`, ephemeral: true });
        }
    },
};

