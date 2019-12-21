const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
const sahip = ayarlar.sahip;
exports.run = function(client, message) {

const sahip = ayarlar.sahip
message.channel.send(
new Discord.RichEmbed()
  .setAuthor('Sahiplerim')
  .setDescription(sahip)
  .setColor('GREEN')
  .setTimestamp()

)

  };
exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: ["botsahipleri", "botowner", "botsahip","owners", "yapımcı", "yapımcım"],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 0 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'botsahipleri',//Komutun adı (Komutu girerken lazım olucak)
  category: 'bot',// Komutun olduğu kategori. kategoriler: bot-sunucu-yetkili-kullanıcı
  description: 'Botun sahiplerini gösterir',//Komutun Açıklaması
  usage: 'botsahipleri' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}
