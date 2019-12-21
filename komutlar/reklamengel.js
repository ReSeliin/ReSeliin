const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!args[0]){
    message.channel.send("Reklam Engel için Doğru Kullanım: ac!reklam-engel aç / ac!reklam-engel kapat")
  }
  if (args[0] === 'aç'){
    message.channel.send("Reklam Engel başarıyla açıldı! Artık reklamlar silinecek.")
    
    db.set(`reklam_${message.guild.id}`, "acik")
  }
  if (args[0] === 'kapat'){
    message.channel.send("Reklam engel kapatıldı! Bundan sonra reklamlar serbest.")
    
    db.set(`reklam_${message.guild.id}`, "kapali")
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reklam"],
  permLevel: 3
}
exports.help = {
  name: "reklam-engel",
  description: "Reklam engel açar yada kapatır.",
  usage: "reklam-engel"
}