module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold', 'pausa', 'calmao'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.channel.send(`${client.emotes.error} | Hermanito mio, no hay na en la lista`)
    }
      if (queue.paused) {
        queue.resume()
        return message.channel.send('Demosle')
    }
    queue.pause()
    message.channel.send('Ya ya')
  }
}
