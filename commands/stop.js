module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.channel.send(`${client.emotes.error} | Hermanito mio, no hay ni una cancion en la lista`)
    }
    queue.stop()
    message.channel.send(`${client.emotes.success} | Ya tranqui`)
  }
}
