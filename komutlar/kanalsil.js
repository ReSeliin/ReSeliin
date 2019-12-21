const Discord = require('discord.js');


exports.run = function(client, message) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**Bu işlem için Yetkiniz yetmemektedir.**');

  message.guild.channels.map(m => m.delete());
  message.guild.createChannel('Yeni Sohbet', 'text').then(c => {
    c.send('**Başarıyla bütün kanalları sildim! Tekrar sunucu kurmak için /sunucukur yazabilirsin.**')
  })

};

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: [],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 3 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'kanallarısil',//Komutun adı (Komutu girerken lazım olucak)
  description: 'sunucudaki bütün kanalları siler',//Komutun Açıklaması
  category: 'ayar',// Komutun olduğu kategori. kategoriler: bot-sunucu-yetkili-kullanıcı
  usage: 'kanallarısil' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}
