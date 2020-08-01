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
            if(args[1] === 'info'){
                msg.channel.send('Current Event: Word Hunt\nSolve 3 riddles and piece a phrase to win. To submit an answer, put a $ before each answer (all answers should be 1 word, all lowercase). You will get a DM when you get a correct answer, giving you part of the phrase. First to piece together all three phrases win!'); 
            }else {
            const embed = new Discord.MessageEmbed()
            .setTitle('Command List')
            .addFields(
                {name:'Event Commands', value:"$riddle (number)\nGet a riddle for the word hunt (1, 2, or 3)\n"},
                {name:'Other Commands', value:"$help\nShows the list of commands\n\n$help info\nShows the current ongoing event\n\n$subscribe\nCreator's YT link", inline:true}
            )
                .setColor('#68e3a8')
            msg.channel.send(embed);
            }
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
            msg.author.send("Is this your dms?");
            break;
        case "$embed":
            const embed = new Discord.MessageEmbed()
            .setTitle(msg.author.username + '\'s info')
            .addField('Name', msg.author.username)
            .setColor('#48C9B0')
            msg.channel.send(embed);
            break;
        }
})




const usedButton = new Set();

bot.login(process.env.BOT_TOKEN);