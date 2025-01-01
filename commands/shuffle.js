module.exports = {
  name: 'shuffle',
  aliases: ['mix', 'sh', 'aleatorio'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.channel.send(`${client.emotes.error} | Hermanito mio, no hay na en la lista`)
    }
    queue.shuffle()
    message.channel.send('Lista mezclada')
  }
}
