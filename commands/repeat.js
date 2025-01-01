module.exports = {
  name: 'repeat',
  aliases: ['loop', 'rp', 'repetir'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      return message.channel.send(`${client.emotes.error} | Hermanito mio, no hay cancion`)
    }
    try {
      let mode = null
    switch (args[0]) {
      case 'off':
        mode = 0
        break
      case 'no':
        mode = 0
        break
      case 'song':
        mode = 1
        break
      case 'cancion':
        mode = 1
        break
      case 'tema':
        mode = 1
        break
      case 'queue':
        mode = 2
        break
      case 'playlist':
        mode = 2
        break
      case 'lista':
        mode = 2
        break
    }
    mode = queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? 'Repeat lista' : 'Repetir cancion') : 'Off'
    message.channel.send(`${client.emotes.repeat} | Seteando modo a \`${mode}\``)
    } catch (e) {
      console.error(e)
      message.channel.send(`${client.emotes.error} | Error, los argumentos validos son: \n |off, no| \n |song, cancion, tema| \n |queue, playlist, lista|`)
    }
  }
}