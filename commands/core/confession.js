const { InteractionReplyOptions, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField, GatewayIntentBits, Guild } = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'confession',
  description: "set confession ",
  voiceChannel: false,
  async execute({ inter, client }) {
    if (inter.guild.name) {
      let channelData = db.get(`confessionChannels_${inter.guild.id}`) //get the db of the confession channel in current guild
      let inGuild = new EmbedBuilder() //create a new embed message
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) }) //text & guild icon for the author in embed
        .setDescription(`Hey ${client.user.username}, I sent you a direct message! Reply back to my DM with your confession and I'll anonymously post it to ${inter.guild.name}.`)

      inter.reply({ embeds: [inGuild], ephemeral: true })
      let sendDM = new EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) }) //text & guild icon for the author in embed
        .setDescription(`${inter.user}, please type your confession below and sent it to me as a message`)
      //.setDescription(`Confession Channel`, `<#${channelData}>`) //display the confession channel get from db
      inter.user.send({ embeds: [sendDM] }).then(msg => { //send the embed to interaction user's DM, then...
        const filter = i => i.author.id == inter.user.id //create a filter for the awaitMessage function
        msg.channel.awaitMessages({
          filter, //apply the filter, so it await message of user's DM
          max: 1,
          time: 5 * 60000,
          errors: ['time']
        }).then(messages => {
          let msg1 = messages.first().content //the content that awaitMessage function received
          if (msg1.toLowerCase() == ("c!" + 'cancel')) { //if the message received is prefix + cancel, for example: c!cancel
            let cancelEmbed = new EmbedBuilder()
              .setTitle('Confession >> Cancelled')
              .setDescription(`${inter.user}, cancelled confession process successfully!`) //show the cancelled messages
            inter.user.send({ embeds: [cancelEmbed] }) //then send this embed to user's DM
          } else {
            let waitingMessage = new EmbedBuilder()
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) }) //now this title is much better :)
              .setDescription(`${inter.user}, your confession has sent to <#${channelData}> successfully!`)
            inter.user.send({ embeds: [waitingMessage] })

            let postMessage = new EmbedBuilder() //the embed we send to channel
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
              .setThumbnail('https://cdn.discordapp.com/attachments/508021346551332877/1115337552619126824/F1F9C854-E66E-4B1E-A234-41488D9A5AF8.jpg')
              .setDescription(msg1 + '\nType " /confession" to send a confession')
              .setTimestamp()
            // client.channels.cache.get(channelData).send({ embeds: [postMessage] });
            const channel = client.channels.cache.get(channelData);
            channel.send({ embeds: [postMessage] })
            // let user = client.users.fetch("328782430049927168").catch(() => null);
            let ownerEmbed = new EmbedBuilder() //the embed we send to channel
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
              .setDescription(`${inter.user} has send this confession: \n ${msg1}`)
              .setTimestamp()
            client.users.cache.get('328782430049927168').send({ embeds: [ownerEmbed] });

            // user.send({ embeds: [postMessage] });
            // user = client.users.fetch("348314340690100225").catch(() => null);
            // user.send({ embeds: [postMessage] });

            // client.channels.fetch(channelData)
            //   .then(channel => channel.send('booyah!'));
          }
        }); // we need to make this command only used in server, so let's make it
      })
    } else {
      inter.user.send({ content: `The **/confession** command can only be used in a server! Please try again there.` });
    }
  },
}
