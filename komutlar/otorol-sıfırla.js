const Discord = require('discord.js')
const fs = require('fs')

exports.run = async (client, message, args) => {
  message.delete(5000);
      let sunucuyaözelayarlarOtorol = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
        let otorolkapat = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
        if(!sunucuyaözelayarlarOtorol[message.guild.id]) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Otorolü Ayarlamadığın İçin Sıfırlayamazsın!`)
                .setColor("RED")
                .setTimestamp('Ayarlamak İçin /otorol @roladi')
            message.delete(5000)
            message.channel.send({embed})
          message.delete(5000);
            return
        }
        delete sunucuyaözelayarlarOtorol[message.guild.id]
        fs.writeFile("./autorole.json", JSON.stringify(sunucuyaözelayarlarOtorol), (err) => {
            console.log(err)
        })
        const embed = new Discord.RichEmbed()
            .setDescription(`Otorol Başarıyla Sıfırlandı`)
            .setColor("RANDOM")
            .setTimestamp()
        message.channel.send({embed})
        return
    }


exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'otorolsıfırla', 
  description: 'Otorol kapatır',
  usage: 'otorolsıfırla'
};