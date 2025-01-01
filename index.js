const { DisTube } = require('distube')
const Discord = require('discord.js')
const fs = require('fs')
const config = require('./config.json')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { setTimeout } = require('timers/promises');

//Intents
/*
Seteamos los intents, osea que chucha espera discord que
haga el bot en temas de api
ver canales, mensajes, voice etc
*/
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent
  ]
})

//Client config
/*
unas configs del cliente, que en este caso seria el bot
obviamente
*/
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji          // **TO DO** buscar algo mejor?
client.config = require('./config.json')
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})

//Comandos
/*
Ya aqui carga los comanditos
lee la carpeta commands, y les recorta
el .js pa procesarlos en una lista.
De esa lista la pone en el cmd <-- grande cmd color a vieja!
*/
fs.readdir('./commands/', (err, files) => {
    if (err) {
        return console.log('No esta la carpeta commands mi pana')
    }  
    const jsFiles = files.filter(f => f.split('.').pop() === 'js')
    if (jsFiles.length <= 0) {
        return console.log('No hay comandos mi loco')
    }
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`${file} Listo`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) {
            cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
        }
    })
})

//Client ready
client.on('ready', () => {
  console.log(`${client.user.tag} Tamos listos.`) //Bien simple po pa que lo
})                                                //wa documentar

// Handler
/*
Aqui es medio brigido, el handler messageCreate
va a cachar si es que aparece un mensaje de un canal
que pueda ver, (o todos si no esta configurado)
y primero revisa si es del bot, si no lo es, revisa si 
parte con el prefijo que se asigno en config.json (que grande el json boludo)
si comienza con "-" en este caso, despues separa en las variables args, command
que hacen cleanup y basico del mensaje
de ahi los tira a cmd.run que itera de manera bien ineficiente aer si le achunta a alguno

tambien revisa si es que el modulo(comando.js) pide que el usuario este en un vc ej '-play'
*/
client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return
    const prefix = config.prefix
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
        return message.channel.send(`${client.emotes.error} | No te veo en un canal`)
    }
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
    }
})

//Distube

/*const status = queue =>
  `Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
*/

const status = queue =>
  `Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'  //Creando el mensaje
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send( 
      `${client.emotes.play} | Poniendo \`${song.name}\` - \`${song.formattedDuration}\`\nDe parte de: ${
        song.user           //playSong de distube crea cosas bonitas
      }\n${status(queue)}`
    )
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.success} | Agregando ${song.name} - \`${song.formattedDuration}\` a la lista, gracias a: ${song.user}`
    )                       //Lo mismo pero mas barato
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `${client.emotes.success} | Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`
    )
  )                           //Lo mismo pero mas caro
  .on('error', (channel, e) => {
    if (channel) channel.send(`${client.emotes.error} | Error: ${e.toString().slice(0, 1974)}`)
    else console.error(e)       //Lo mismo pero mas fallado
  })
  //.on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...')) codigo pa que el bot se vaya, lo cual no queremos
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} | No encontre \`${query}\``)
  )
  .on('finish', queue => queue.textChannel.send('No quedan mah!'))

//Si no lo miro no es ilegal dijo el homero

/*
  DisTubeOptions.searchSongs = true
  .on("searchResult", (message, result) => {
    let i = 0
    message.channel.send(
      `**Choose an option from below**\n${result
            .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
            .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
    )
  })
  .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
  .on("searchInvalidAnswer", message =>
    message.channel.send(
      `${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
    )
  )
  .on("searchDone", () => {})
*/
client.login(config.token)  // ahi pa que parta