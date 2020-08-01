const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready' , () =>{
    console.log('This bot is online!');

});


bot.on('message', msg =>{

    const sender = msg.author;

    let args = msg.content.split(" ");

    switch(args[0]){

        case '$help':
            const embed = new Discord.MessageEmbed()
            .setTitle('Command List')
            .addFields(
                {name:'Basic Commands', value:"$help\nShows the list of commands\n\n", inline:true}
            )
            .addFields(
                {name:'Strike Commands', value:"$strikes\nShows how many strikes you have and why\n\n", inline:true}
            )
                .setColor('#68e3a8')
            msg.channel.send(embed);
            break;
        case '$beeptest':
            msg.channel.send("Beep").then((sent) => sent.edit("Boop!"))
            break;
        case '$auto5':
            setTimeout(() => {
                msg.channel.send("Sent after 5 seconds");
            }, 5000);
            break;
        case "$dmtest":
            msg.author.send("Yo");
            break;
        case "$embed":
            const embed = new Discord.MessageEmbed()
            .setTitle(msg.author.username + '\'s info')
            .addField('Name', msg.author.username)
            .setColor('#48C9B0')
            msg.channel.send(embed);
            break;
        
        //strike commands
        case "$strikes":
            const embed = new Discord.MessageEmbed()
            .setTitle(msg.author.username + '\'s strikes')
            .addField('Strike 1', "Reason for strike")
            .setColor('#c40d00')
            msg.channel.send(embed);
            break;
        }
})

const usedButton = new Set();

bot.login(process.env.BOT_TOKEN);