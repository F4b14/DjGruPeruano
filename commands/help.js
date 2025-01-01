const Discord = require('discord.js')
const { EmbedBuilder, Embed } = require('discord.js');

module.exports = {
  name: 'help',
  aliases: ['h', 'cmd', 'command'],
  run: async (client, message) => {
    const commands = new Discord.EmbedBuilder()
    .setTitle('Comandos')
    .setDescription(client.commands.map(cmd => `\`${cmd.name}\``).join(', '))
    .setColor('Purple')
    message.channel.send({ embeds: [commands] });   
      
    }
  }

