module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.channel.send(`${client.emotes.error} | Hermanito mio, no hay na en la lista`)
    }
    const song = queue.songs[0]
    message.channel.send(`${client.emotes.play} | Estoy poniendo **\`${song.name}\`**, cortesia de ${song.user}`)
  }
}
