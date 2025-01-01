module.exports = {
  name: 'previous',
  aliases: ['anterior', 'patras', 'a'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.channel.send(`${client.emotes.error} | Hermanito mio, no hay na en la lista`)
    }
    const song = queue.previous()
    message.channel.send(`${client.emotes.success} | Poniendo:\n${song.name}`)
  }
}
