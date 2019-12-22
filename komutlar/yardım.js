const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
    const embedyardim = new Discord.RichEmbed()
        .setColor("#9900CC")
       .addField("sunucular", "botun bulunduğu sunucuları gösterir")
    .addField("KOMUT 2", "KOMUT AÇIKLAMASI 2")
    .addField("KOMUT 3", "KOMUT AÇIKLAMASI 3")
    .addField("KOMUT 4", "KOMUT AÇIKLAMASI 4")
    .addField("KOMUT 5", "KOMUT AÇIKLAMASI 5")
    .addField("KOMUT 6", "KOMUT AÇIKLAMASI 6")
    .setDescription("Bot Adı | Yardım komutları |Tüm hakları saklıdır (2018-2019)")
    
    if (!params[0]) {
        const commandNames = Array.from(client.commands.keys());
        message.channel.send(embedyardim);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["yardım","help","halp","yardim","Yardım","Yardim","Help","Halp"],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
};