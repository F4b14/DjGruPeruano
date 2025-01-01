module.exports = {
  name: 'forward',
  aliases: ['ff', 'adelante'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.channel.send(`${client.emotes.error} | Hermanito mio, no hay na en la lista`)
    }
      if (!args[0]) {
        return message.channel.send(`${client.emotes.error} | Ya pero cuanto`)
    }
    const time = Number(args[0])
    if (isNaN(time)) {
      return message.channel.send(`${client.emotes.error} | Pero un numero entero si po`)
    }
    queue.seek((queue.currentTime + time))
    message.channel.send(`Avanzando la cancion por ${time}`)
  }
}
