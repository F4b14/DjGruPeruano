module.exports = {
  name: 'skip',
  aliases: ['s', 'n', 'siguiente'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.channel.send(`${client.emotes.error} | Hermanito mio, no hay na en la lista`)
    }
    if (queue.songs.length <= 1) {
      return message.channel.send(`${client.emotes.error} | No hay más canciones en la lista`)
    }
    try {
      await queue.skip()
      message.channel.send(`${client.emotes.success} | Canción saltada`)
    } catch (e) {
      message.channel.send(`${client.emotes.error} | Error al intentar saltar la canción`)
    }
  }
}
