module.exports = {
  name: 'queue',
  aliases: ['q', 'lista', 'l'],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.channel.send(`${client.emotes.error} | Aqui no hay na manito`)
    }
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Poniendo:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    message.channel.send(`${client.emotes.queue} | **Lista**\n${q}`)
  }
}
