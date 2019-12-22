const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, msg, message, args) => {
    if(message.author.id !== ayarlar.sahip) if(message.author.id !== ayarlar.sahip2) return message.channel.send('**`Bu Komutu Sadece Yapımcım Kullanabilir!`**')

  if (msg.channel.type === "dm" || msg.channel.type === "group") {
    return;
  };
  if (msg.member.hasPermission("KICK_MEMBERS")) {
    return msg.reply("Beni sunucudan gönderdiğin için üzgünüm... :wave:").then(m => {
      m.guild.leave().then(g => {
        console.log(`Bir sunucudan çıkarıldım.\n    Adı: ${g.name}\n    ID: ${g.id}\n    Sahibi: ${g.owner.user.tag} (${g.ownerID})\n    Çıkaran Kişi: ${msg.author.tag} (${msg.author.id})\n`);
      }).catch(e => {
        console.error(e);
      });
    }).catch(e => {
      console.error(e);
    });
  } else {
    return msg.reply("Yetkiniz Yetmemekte!").catch(e => {console.error(e);})}};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'qweqwewq545478454',
  description: 'Bot sunucudan ayrılır.',
  usage: 'qwewqewq45548484548'
};