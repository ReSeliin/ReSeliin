const Discord = require('discord.js'); 

exports.run = (client, message, args) => {
    const tamam = new Discord.RichEmbed()
        .setColor("GREEN")
 .setTitle(' Sunucuda ki bütün Yasaklanan kullanıcıların yasağını kaldırdı! :white_check_mark:')
    message.channel.sendEmbed(tamam)

  message.guild.fetchBans().then(bans => {
      bans.forEach(user => {
        message.guild.unban(user)
      });
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'yasakları-aç',
  description: 'Sunucuda ki bütün yasaklı kullanıcıların yasağını kaldırır.',
  usage: 'yasakları-aç' //salladım düzeltirsiniz
};