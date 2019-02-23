var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var quotes = [
]; //array that contains all the quotes, not best practise to have this stored
//in this file but i couldn't be bothered to figure out how to import it
//from a dedicated .JSON file

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Init Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `-`
    if (message.substring(0, 1) == '-') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // -quote
            case 'quote':
                // now we're going to establish a variable that chooses
                // a random item from the quotes array and saves it,
                // then resets the value everytime the command is run
                var rand = quotes[Math.floor(Math.random() * quotes.length)];
                bot.sendMessage({
                    to: channelID,
                    message: rand
                });
            break;
          }
      }
 });
