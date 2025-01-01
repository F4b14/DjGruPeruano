module.exports = {
  name: 'leave',
  aliases: ['chao', 'andate'],
  run: async (client, message) => {
    message.channel.send(`Noh vimoh!`)
    client.distube.voices.leave(message)
  }
}
