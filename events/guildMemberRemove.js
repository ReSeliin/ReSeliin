module.exports = member => {
  let guild = member.guild;
  member.send('Sunucudan Ayrıldı!');
  guild.defaultChannel.send(`Sunucumuzdan ayrıldı`+ username );
};
