const Discord = require('discord.js');
 
exports.run = (client, message) => {

message.channel.send(
new Discord.RichEmbed()
.setTitle("Trash Bot -- Yenilikler")
.addField("Yeni komutlar:", "minecraft, youtubearama")
.setColor("RANDOM")
.setTimestamp()
.setFooter(message.author.username + "Tarafından kullanıldı.")
)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'yenilikler',
  description: 'Bota gelen yenilikleri gösterir',
  kategori: 'bot',
  usage: 'yenilikler' 
}