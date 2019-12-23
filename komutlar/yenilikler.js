const Discord = require('discord.js');
 
exports.run = (client, message) => {

message.channel.send(
new Discord.RichEmbed()
.setTitle("Trash Bot -- Yenilikler")
.addField("Yeni komutlar:", "/banlananlar : \n Bu komut sayesinde sunucunuzdan banladığınız kişilerin adı ve id si ile görüceksiniz İyi oyunlar...")  
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