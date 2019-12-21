const Discord = require("discord.js");

exports.run = function(client, message, args) {
  const hayir = "❌";
  const evet = "✅";
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "⚠️ | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!"
    );
  const msg = args.join(" ");
  if (!msg) return message.channel.send("**Oylamam için bir şey gir!**");
  message.delete();
  message.channel
    .send(
      new Discord.RichEmbed()
        .setTitle("Oylama")
        .setDescription(msg)
        .setColor("RANDOM")
        .setFooter(
          message.author.tag + " tarafından başlatıldı..",
          message.author.avatarURL
        )
    )
    .then(function(i) {
      i.react(evet);
      i.react(hayir);
      // evet hayır Şeklinde Sorar :)
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oyla"],
  permLevel: 3
};
exports.help = {
  name: "oylama",
  description: "İstediğiniz şeyi oylar",
  category: "kullanıcı",
  usage: "oylama [İçerik]"
};