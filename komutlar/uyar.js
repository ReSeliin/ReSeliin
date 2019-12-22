const Discord = require('discord.js');


exports.run = function(client, message, args) {
//Komutun Kodları
  
  const user = message.mentions.users.first()
  const reason =args.slice(1).join(' ');
  if(!user) return message.channel.send(':warning: Kimi uyaracağımı etiketlemen gerek')
  if(!reason) return message.channel.send(':warning: Bir sebep yazman gerek')
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':warning: Üzgünüm, Bu işlem için yetkin yok')
  message.delete();
  message.channel.send(':tada: Başarı ile uyardım!').then(m => m.delete(5000))
  user.send(
  new Discord.RichEmbed()
    .setTitle('**Uyarıldın :warning:**')
    .setDescription('**'+message.guild.name+' ** Adlı sunucudan ** '+reason+'** Sebebi ile uyarıldın!')
    .setFooter("Kurallara uymazsan uyarılırsın")
    .setColor('RED')
  )
};

exports.conf = {
  enabled: true,//True => Komut açık, False => Komut kapalı 
  guildOnly: false, //True => Sadece Servere Özel, False => Heryerde kullanılabilir
  aliases: [],//Komutun farklı kullanımları ÖR: !ping, !p
  permLevel: 3 //kimlerin kullanabileceğini  (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'uyar',//Komutun adı (Komutu girerken lazım olucak)
  description: 'Etiketlediğiniz kişiyi uyarır.',//Komutun Açıklaması
  kategori: 'yetkili',// Komutun olduğu kategori. kategoriler: bot-sunucu-yetkili-kullanıcı
  usage: 'uyar @Kullanıcı [Sebep]' //komutun kullanım şekli; ÖR: !ban @Kullanıcı
}