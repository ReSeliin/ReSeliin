const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
    const embedyardim = new Discord.RichEmbed()
        .setColor("#080000")
       .addField("Anlık Ping", `${client.ping} **ms**`)
        .addField("Sistem Bilgileri", `**İşletim Sistemi**: Windows/Linux/MAC `)
    if (!params[0]) {
        const commandNames = Array.from(client.commands.keys());
        message.channel.send(embedyardim);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pong","gecikme","servis"],
    permLevel: 0
};

exports.help = {
    name: 'ping',
};