const Discord = require('discord.js');


exports.run = function(client, message, args) {
//Komutun Kodları
  
  const user = message.mentions.users.first()
  const reason =args.slice(1).join(' ');
  if(!user) return message.channel.send(':warning: Kimi uyaracağımı etiketlemen gerek')
  if(!reason) return message.channel.send(':warning: Bir sebep yazman gerek')
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':warning: Üzgünüm, Bu işlem için yetkin yok')
  message.delete();
  message.channel.send(':tada: Mesajını başarılı bir şekilde gönderdim').then(m => m.delete(5000))
  user.send(
  new Discord.RichEmbed()
    .setTitle('**T R A S H BOT MESAJ**')
    .setDescription('**'+message.guild.name+' ** Adlı sunucudan ** '+reason+'** ')
    .setFooter("Yapımcı Ve Owner ReSeliin #8888 ")
    .setColor("#080000")
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