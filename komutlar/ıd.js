const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
let iUser = message.mentions.members.first() || message.author;
const embed = new Discord.RichEmbed()
.setColor("#080000")
.setDescription(`<@${iUser.id}> kullanınıcın ID Numarası: **${iUser.id}**`)
message.channel.send(embed);
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ıdgöster"],
  permLevel: 3
};

module.exports.help = {
  name: "ıd",
  description: "Id Numaranızı gösterir.",
  usage: "ıd"
};
