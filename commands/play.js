module.exports = {
  name: 'play',
  aliases: ['p'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) {
      const queue = client.distube.getQueue(message)
      if (!queue) {
        return message.channel.send(`${client.emotes.error} | Cual po?`)
      }
      if (queue.paused) {
        queue.resume()
        return message.channel.send('Demosle')
      }
    }
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    })
  }
}
