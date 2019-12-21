const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, params) => {
    const xir = new Discord.RichEmbed()
    .setColor("#0aff00")
    .setAuthor(message.guild.name, message.guild.iconURL)
    .addField('Sunucu Adı:', message.guild.name)
    .addField('Sunucu ID:', message.guild.id)
    .addField('Kanal sayısı:', message.guild.channels.size)
    .addField('Sunucu Bölgesi:', message.guild.region)
    .addField('Üye sayısı:', message.guild.memberCount)
    .addField('Sahibi:', message.guild.owner)
    .addField('Oluşturulma tarihi:', message.guild.createdAt)
    .setThumbnail(message.guild.iconURL);
    return message.channel.sendEmbed(xir);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sb'],
  permLevel: 3
};
exports.help = {
  name: 'sunucubilgi',
  description: 'Sunucu hakkında bilgi verir.',
  usage: 'sunucubilgi'
};
