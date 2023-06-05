const db = require('quick.db');
const { ApplicationCommandOptionType, GatewayIntentBits, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'confession-channel',
    description: 'Set the Confession channel',
    voiceChannel: false,
    permissions: GatewayIntentBits.ManageMessages,
    ephemeral: true,
    options: [
        {
            name: 'channel',
            description: 'the channel you want to send it to',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],
    async execute({ inter }) {
        let channelName = inter.options.getChannel('channel');
        if (channelName.type !== 0) return inter.reply({ content: `you have to send it to a text channel.. ❌`, ephemeral: true })
        let confessionChannel = channelName;
        let channelEmbed = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) }) //the author in the embed, show the >        
            .setDescription(`${inter.user}, you have successfully set the anonymous confessions channel to ${confessionChannel}`)
        db.set(`confessionChannels_${inter.guild.id}`, confessionChannel.id) //set the confession channel of guild

        inter.reply({ embeds: [channelEmbed], ephemeral: true })
    }
}