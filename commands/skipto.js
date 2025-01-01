module.exports = {
  name: 'skipto',
  aliases: ['jump', 'j'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.channel.send(`${client.emotes.error} | Hermanito mio, no hay na en la lista`)
    }
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | A cual po?`)
    }
    const num = Number(args[0])
    if (isNaN(num)) {
      return message.channel.send(`${client.emotes.error} | Ojala un numero entero si po`)
    }
    await client.distube.jump(message, num).then(song => {
    message.channel.send({ content: `Saltando a: ${song.name}` })
    })
  }
}
