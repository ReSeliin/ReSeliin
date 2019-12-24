const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("\`Üyeleri At\` izniniz bulunmamaktadır.!");
    let sebep = args.slice(1).join(" ");
    if(!sebep){ return message.channel.send(`Örnek Kullanım: \`${ayarlar.prefix}at <kullanıcı> <sebep>\``)}
    let kullanici = message.mentions.users.first();
    let logkanal = message.guild.channels.find("name", "mod-log")
    if(!logkanal) { return message.channel.send("\`mod-log\` adında kanal bulamıyorum lütfen \`mod-log\` adında kanal açın")}
    let Kullanici = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!Kullanici) return message.channel.send("Kullanıcı Bulunamadı!");
    let kReason = args.join(" ").slice(22);
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Mesajları Yönet izniniz bulunmamaktadır.!");
    if(Kullanici.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Belirttiğiniz Kullanıcının rolü benim rolümden yüksek olduğu için kullanıcıyı atamıyorum :)");

    const embed = new Discord.RichEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTimestamp()
            .setDescription(`**Sunucudan Atıldı**\n**Kullanıcı:** ${kullanici.tag}\n**Yetkili:** ${message.author.tag}\n**Sebep:** ${sebep}`);
    logkanal.send({embed});
  message.delete(2500)
    message.channel.send(`**${kullanici.tag}** sunucumuzdan atıldı Sebebi:\`${sebep}\``);
    var dmkullanici = new Discord.RichEmbed()
            .setAuthor(`${message.guild.name} adlı Sunucudan Atıldınız`,message.author.avatarURL || client.user.avatarURL)
            .setColor("#080000")
            .addField(`Atan Yetkili`,message.author.tag)
            .addField(`Atılma Sebebiniz`,sebep)
            .setThumbnail(message.guild.avatarURL || client.user.avatarURL)
    kullanici.send(dmkullanici);
    message.guild.member(Kullanici).kick(kReason);

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kick","yoket","tekmele"],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'Kullanıcyı Sunucudan atarsınız',
  usage: 'kick <kullanıcı> <sebep>'
};
