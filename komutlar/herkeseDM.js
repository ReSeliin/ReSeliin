const Discord = require('discord.js');

exports.run = (client, message, args) => {

    if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor("#080000")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('Yetkin Yok!')
    return message.author.sendEmbed(ozelmesajuyari); }

  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.channel.send('DMYe ne yazağım aloo ?');

  message.delete();

  console.log(`Duyuru: "${message.author.username}#${message.author.discriminator}" "${mesaj}"`);

      const mesajat = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(''+ mesaj +'')

      client.users.forEach(u => {
u.sendEmbed(mesajat)
})

message.channel.send(`✅Attım bro sıkıntı yok`);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['herkesedm'],
  permLevel: 3
};

exports.help = {
  name: 'duyuru',
  description: 'İstediğiniz şeyi bota duyurtur (Sadece Yönetici Yetkisine Sahip Kişiler Yapabilir).',
  usage: 'duyuru [duyurmak istediğiniz şey]'
};
