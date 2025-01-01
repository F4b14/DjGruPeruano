module.exports = {
  name: 'skip',
  aliases: ['s', 'n', 'siguiente'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.channel.send(`${client.emotes.error} | Hermanito mio, no hay na en la lista`)
    }
    try {
      const song = await queue.skip()
      message.channel.send(`${client.emotes.success} | Skipeada, Poniendo:\n${song.name}`)
    } catch (e) {
      message.channel.send(`${client.emotes.error} | No hay mas compita`)
    }
  }
}
