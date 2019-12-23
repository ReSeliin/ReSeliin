exports.run = (bot, message, args) =>
{
  let Discord = require('discord.js');
    var userlist = message.guild.fetchBans();
   userlist.then(collection =>
   userlist.then(collectionobject =>              
   {
     if(collection.first() == null)
     {
       const embed = new Discord.RichEmbed()
       .setTitle(`:no_entry_sign: Banlanan Kullanıcı bulunamadı :no_entry_sign:`)
       .setColor("#080000");
       message.channel.send({embed});
       message.delete()
     }
     else
     {
       const embed = new Discord.RichEmbed()
       .setTitle(":no_entry_sign: Banlistesi | Sunucudan Banlananlar")
       .setColor("#080000");
       for(collectionobject of collection)
       {
           var user = collectionobject[1];
           embed.addField(` **${user.tag}**`, `__________ __________`);
           embed.addField(`**${user.id}**`,`__________ __________`);
       }
       message.channel.send({embed});
     }
   }));
 }


module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["banlılar","banliste"],
  permLevel: 0
};

module.exports.help = {
  name: 'banlananlar',
  description: 'Sunucundan Banlanan üyeleri gösterir.',
  usage: 'banlananlar'
};