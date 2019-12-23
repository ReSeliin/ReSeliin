const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
    const embedyardim = new Discord.RichEmbed()
        .setColor("#9900CC")
    .setThumbnail('https://i.ibb.co/0jj0bBK/77aa916d484d3138bea71c180dd3d683.jpg')
    .addField("sunucular", "Botun bulunduğu sunucuları gösterir")
    .addField("anime", "Anime resimleri atar")
    .addField("botdavet", "Botu sunucunuza davet etmenize sağlar")
    .addField("botsahipleri", "Botun sahibini gösterir")
    .addField("davet", "Bot size bir davet linki oluşturur")
    .addField("sunucubilgi", "Sunucu hakkında bilgi verir")
    .addField("yetkililer", "Bot sv deki yetkilileri gösterir")
    .addField("kullanıcıbilgim","Bot sizin hakkınızdaki bilgileri verir")
    .addField("clordavet","Sponsorumuz Olan Fortnite skin ve hesapları satan marketin davet linkini verir")
    .addField("ürünler","Sponsorumuz Olan Clor marketin ürünlerini gösterir")
    .setDescription("T R A S H BOT | Yardım komutları |Tüm hakları saklıdır (2019-2020)")
    
    if (!params[0]) {
        message.delete()
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