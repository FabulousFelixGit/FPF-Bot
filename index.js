const Discord = require('discord.js');
const bot = new Discord.Client();

const Enmap = require("enmap");
bot.points = new Enmap({name: "points"});


bot.on('ready' , () =>{
    console.log('This bot is online!');
    bot.user.setActivity('f!help', {type: "PLAYING"}).catch(console.error);
});

bot.on('message', msg =>{

    const sender = msg.author;

    let args = msg.content.split(" ");

    switch(args[0]){

        case 'f!help':
            const embed = new Discord.MessageEmbed()
            .setTitle('Command List')
            .addFields(
                {name:'Basic Commands', value:"f!help\nShows the list of commands\n\n", inline:true},
                {name:'Strike Commands', value:"f!strikes\nShows how many strikes you have and why\n\n", inline:true}
            )
                .setColor('#03398f')
            msg.channel.send(embed);
            break;
        case 'f!beeptest':
            msg.channel.send("Beep").then((sent) => sent.edit("Boop!"))
            break;
        case 'f!auto5':
            setTimeout(() => {
                msg.channel.send("Sent after 5 seconds");
            }, 5000);
            break;
        case "f!dmtest":
            msg.author.send("Yo");
            break;
        case "f!embed":
            const embed0 = new Discord.MessageEmbed()
            .setTitle(msg.author.username + '\'s info')
            .addField('Name', msg.author.username)
            .setColor('#48C9B0')
            msg.channel.send(embed0);
            break;
        
        //strike commands
        case "f!strikes":
            const embed1 = new Discord.MessageEmbed()
            .setTitle(msg.author.username + '\'s strikes')
            .addField('Strike 1', "Reason for strike")
            .addField('Strike 2', "Reason for strike")
            .addField('Strike 3', "Reason for strike")
            .setColor('#c40d00')
            msg.channel.send(embed1);
            break;
        }
    
    //points sytem
    if (msg.author.bot) return;
  
        if (msg.guild) {
            // We'll use the key often enough that simplifying it is worth the trouble.
            const key = `${msg.guild.id}-${msg.author.id}`;

        // Triggers on new users we haven't seen before.
        bot.points.ensure(`${msg.guild.id}-${msg.author.id}`, {
          user: msg.author.id,
          guild: msg.guild.id,
          points: 0,
          level: 1
        });

        bot.points.inc(key, "points");

        // Calculate the user's current level
        const curLevel = Math.floor(0.1 * Math.sqrt(bot.points.get(key, "points")));

        // Act upon level up by sending a message and updating the user's level in enmap.
        if (bot.points.get(key, "level") < curLevel) {
            msg.reply(`You've leveled up to level **${curLevel}**!`);
            bot.points.set(key, curLevel, "level");
        }
    }
})

bot.login(process.env.BOT_TOKEN);