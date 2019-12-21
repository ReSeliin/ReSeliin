const Discord = require('discord.js');
//const ayarlar = require('../ayarlar.json');

exports.run = async function(client, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
    var user = message.mentions.users.first()
    var del_mes_size = Math.floor(args[1]);
    if (!user) return message.reply("Birisini etiketlemelisin!")
    if (!del_mes_size) return message.reply("Temizlemek istediğin mesaj sayısını yazmalısın!")
    if (isNaN(del_mes_size)) return message.reply("Temizlemek istediğin mesaj sayısını yazmalısın!")
    if (del_mes_size < 1) return message.reply("**1** adetten az mesaj silemem!")
    message.channel.fetchMessages().then(y => {
        var ch_messages = y.filter(m => m.author.id === user.id);
        var size = 0;
        ch_messages.forEach(t => {
            if (size > del_mes_size) return;
            size++;
            t.delete();
            message.delete();
        });
    });
    message.channel.send(`**${user.tag}** adlı kullanıcının **${del_mes_size}** adet mesajı başarıyla silindi!`).then(msg => msg.delete(4000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sil-üye", "mesaj-sil-üye", "mesajları-sil-üye"],
  permLevel: 3
};

exports.help = {
  name: 'temizle-üye',
  description: 'Belirtilen kişinin belirtilen miktarda mesajını siler.',
  usage: 'temizle-üye [@kullanıcı] [miktar]'
};
