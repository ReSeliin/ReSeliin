const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get(">", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

client.on('channelCreate', channel => {
  const c = channel.guild.channels.find('name', 'mod-log');
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Kanal oluşturuldu`, `► İsmi: \`${channel.name}\`\n► Türü: **${channel.type}**\n► ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(`Yeni bi kanal oluşturuldu`,{embed})
});

client.on('channelDelete', channel => {
  const c = channel.guild.channels.find('name', 'mod-log');
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Kanal silindi`, `► İsmi: \`${channel.name}\`\n► Türü: **${channel.type}**\n► ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(`Bir kanal silindi`,{embed})
});

client.on('channelUpdate', (oldChannel, newChannel) => { 
  const c = newChannel.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let str = '';

    if(oldChannel.name != newChannel.name)
        str+=`► İsim: \`${oldChannel.name}\` **->** \`${newChannel.name}\`\n`;

    

    let embed = new Discord.RichEmbed()
                    .addField(`Kanal güncellendi`, `${str}► ID: ${oldChannel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${oldChannel.client.user.username}#${oldChannel.client.user.discriminator}`, oldChannel.client.user.avatarURL)

    c.send(`${oldChannel.name} kanalı güncellendi`,{embed})
});

client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji oluşturuldu`, `► İsmi: \`${emoji.name}\`\n► GIF?: **${emoji.animated}**\n► ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(`Bir emoji oluşturuldu`,{embed})
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji silindi`, `► İsmi: \`${emoji.name}\`\n► GIF? : **${emoji.animated}**\n► ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(`Bir emoji silindi`,{embed})
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.find('name', 'mod-log');
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji güncellendi`, `► Eski ismi: \`${oldEmoji.name}\`\n► Yeni ismi: \`${newEmoji.name}\`\n► ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(`Bir emoji güncellendi`,{embed})
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcı banlandı`, `► İsmi: \`${user.username}\`\n► ID: **${user.id}**\nSebep: **${entry.reason || 'Girilmedi'}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(`**${user.username}#${user.discriminator}** kullanıcısı, **${entry.executor.username}#${entry.executor.discriminator}** tarafından banlandı`,{embed})
});

client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcının banı açıldı`, `► İsmi: \`${user.username}\`\n► ID: **${user.id}**\n`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(`**${user.username}#${user.discriminator}** kullanıcısının, **${entry.executor.username}#${entry.executor.discriminator}** tarafından kaldırıldı`,{embed})
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .addField(`Mesaj silindi`, `► Mesaj: \`${message.content}\`\n► Kanal: **${message.channel.name}**\n► ID: ${message.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(`**${message.author.username}#${message.author.discriminator}** tarafından gönderilen mesaj, ${message.channel} kanalından silindi`,{embed})
});

client.on('messageUpdate', async (oldMessage, newMessage) => {    
      if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${oldMessage.author.username}#${oldMessage.author.discriminator}`, oldMessage.author.avatarURL)
                    .addField(`Mesaj güncellendi`, `► Eski mesaj: \`${oldMessage.content}\`\n► Yeni mesaj: \`${newMessage.content}\`\n► Kanal: **${oldMessage.channel.name}**\n► ID: ${oldMessage.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`, oldMessage.client.user.avatarURL)

    channel.send(`**${oldMessage.author.username}#${oldMessage.author.discriminator}** tarafından gönderilen mesaj, ${oldMessage.channel} kanalında güncellendi`,{embed})
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol oluşturuldu`, `► ismi: \`${role.name}\`\n► ID: ${role.id}`)                    
.setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(`yeni bir rol oluşturuldu`,{embed})
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.find('name', 'mod-log');
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol silindi`, `► ismi: \`${role.name}\`\n► ID: ${role.id}`)                    
.setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(`bir rol silindi`,{embed})
});

client.on('voiceStateUpdate', async (oldMember, newMember) => {    

    let oldVoice = oldMember.voiceChannel;
    let newVoice = newMember.voiceChannel;

  
      if(!oldVoice) {
          var c = newMember.guild.channels.find('name', 'mod-log');
  if (!c) return;
        let embed = new Discord.RichEmbed()

        embed.setAuthor(`${newMember.user.username}#${newMember.user.discriminator}`, newMember.user.avatarURL)
        .addField(`Sesli kanala katıldı`, `► İsmi: \`${newMember.user.username}\`\n► ID: **${newMember.user.id}**`)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(`${newMember.client.user.username}#${newMember.client.user.discriminator}`, newMember.client.user.avatarURL)

        c.send(`**${oldMember.user.username}#${oldMember.user.discriminator}** sesli bir kanala katıldı`,{embed})
    } else if (!newVoice) {
              var c = oldMember.guild.channels.find('name', 'mod-log');
  if (!c) return;
        let embed = new Discord.RichEmbed()

        embed.setAuthor(`${oldMember.user.username}#${oldMember.user.discriminator}`, oldMember.user.avatarURL)
        .addField(`Sesli kanaldan ayrıldı`, `► İsmi: \`${oldMember.user.username}\`\n► ID: **${oldMember.user.id}**`)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(`${oldMember.client.user.username}#${oldMember.client.user.discriminator}`, oldMember.client.user.avatarURL)

        c.send(`**${oldMember.user.username}#${oldMember.user.discriminator}** sesli bir kanaldan ayrıldı`,{embed})
    }
  
  client.on('ready', () => {
  const moment = require("moment");
require("moment-duration-format");

 setInterval(() => {
const calismasure = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
let botdurum = client.channels.find(c => c.id === 'KANALID')//Botun sürekli mesaj atacağı kanal.
const botistatistik = new Discord.RichEmbed()
    .setColor('RED')
    .setTitle('= Bot İstatistikleri =')
    
.addField(`RAM`,`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/512mb`)
.addField(`Çalışma Süresi`,`${calismasure}`)
.addField(`Ping`,`${client.ping}`)
.addField(`discord.js`,`v${Discord.version}`)
.addField(`Bilgi`,`${client.guilds.size.toLocaleString()} sunucu ve ${client.users.array().length} kullanıcıya hizmet veriyor.`)
.setTimestamp()
botdurum.send(botistatistik);
  }, 3600000); //Milisaniye cinsinden. 1 saniye =  1000 milisaniye. Örnek Olarak 1 saat = 3600000milisaniye
});
  
  client.on('message', async message => {
  let ke = await db.fetch(`kufur_${message.guild.id}`)
  
  if (ke === "kapali" || ke === undefined || ke === null){
    return;
  } else if (ke === "acik") {
    let küfür = ["küfür1", "küfür2", "küfür3", "küfür4", "küfür5", "küfür6" ] //bu yolla istediğiniz gibi uzatabilirsiniz.
    if (küfür.some(word => message.content.includes(word))){
        if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        message.channel.send("Küfür etmek yasak kardeşim!")
        message.guild.owner.send("Sunucunuzda bir kişi küfür etti. \nKullanıcı: "+ message.author.tag +" \nMesaj: **"+ message +"** ")
      }
    }
    
  }
})
  
  app.listen(8000);
setInterval(() => {
  http.get('https://silky-learning.glitch.me/');//Buraya yazan yere glitch link
}, 280000)
  
  client.on('guildMemberAdd', async member => {
  let tag = await db.fetch(`tag_${member.guild.id}`)
  
  if (!tag) return
  
  member.setNickname(tag.replace('{uye}', member.user.username))
})

  
});