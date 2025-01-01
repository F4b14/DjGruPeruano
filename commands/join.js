const { Constants } = require('discord.js')

module.exports = {
  name: 'join',
  aliases: ['move', 'ven'],
  run: async (client, message, args) => {
    let voiceChannel = message.member.voice.channel
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0])
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send(`${client.emotes.error} | ${args[0]} Ese canal no es na valido`)
      }
    }
    if (!voiceChannel) {
      return message.channel.send(
        `${client.emotes.error} | No estai en un canal po`
      )
    }
    client.distube.voices.join(voiceChannel)
  }
}