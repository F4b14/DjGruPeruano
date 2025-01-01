const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'play',
  aliases: ['p'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) {
      const queue = client.distube.getQueue(message)
      if (!queue) {
        return message.channel.send(`${client.emotes.error} | Cual po?`)
      }
      if (queue.paused) {
        queue.resume()
        return message.channel.send('Demosle')
      } else {
        return message.channel.send(`${client.emotes.error} | Cual po?`)
      }
    }

    const playButton = new ButtonBuilder()
      .setCustomId('play_button')
      .setLabel('Play')
      .setStyle(ButtonStyle.Success);

    const pauseButton = new ButtonBuilder()
      .setCustomId('pause_button')
      .setLabel('Pause')
      .setStyle(ButtonStyle.Danger);

    const skipButton = new ButtonBuilder()
      .setCustomId('skip_button')
      .setLabel('Skip')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
      .addComponents(playButton, pauseButton, skipButton);

    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    });

    // Eliminar la línea que envía el mensaje con los botones
    // message.channel.send({ content: 'Reproduciendo tu canción...', components: [row] });
  }
}