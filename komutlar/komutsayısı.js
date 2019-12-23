const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  message.delete()
  try {
    
    const embed = new Discord.RichEmbed()
    .setTitle(`${message.guild.name} - Komut Sayısı`)
    .setDescription('**\nToplam**  **' + client.commands.size + '** **Komut Vardır!**' + '\nBu Komutların sadece 9 u userler içindir')
    .setColor("#ff0000")
    .setThumbnail('https://i.ibb.co/0jj0bBK/77aa916d484d3138bea71c180dd3d683.jpg')
    .setTimestamp()
    .setFooter(message.author.username , message.author.avatarURL)

    return message.channel.send({embed});
    
    message.channel.send();
  } catch (err) {
    message.channel.send('Daha Sonra Tekrar Deneyin!\n' + err).catch();  
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'komutlar',
  description: 'Bottaki Komut Sayısını Gösterir.',
  usage: 'komutsayısı'
};