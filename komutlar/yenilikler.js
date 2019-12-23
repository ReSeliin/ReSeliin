const Discord = require('discord.js');
 
exports.run = (client, message) => {

message.channel.send(
new Discord.RichEmbed()
.setTitle("Trash Bot -- Yenilikler")
.setThumbnail('https://i.ibb.co/0jj0bBK/77aa916d484d3138bea71c180dd3d683.jpg')
.addField("Yeninilikler : ","\nBot rahatlatılmıştır ve hatalar düzeltilmiştir")  
.setColor("#080000")
.setTimestamp()
.setFooter(message.author.username + "Tarafından kullanıldı.")
)
  message.delete(2000)
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