require('dotenv').config();
const axios = require('axios');

const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});


// BOT LOGIC
const hasEmoteRegex = /<a?(:\w+:)\d+>/g

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on("messageCreate", msg => {
    // below is the channel ID of the channel that I want to target
    if (msg.channel.id == process.env.WATCH_CHANNEL) {
        // In case there are emojis, we need to parse out the emoji, replace them with text, and put them back into the message
        var newMessage = msg.cleanContent.replace(hasEmoteRegex, (match, p1) =>
          {
            return p1;
          });

        // no message content, don't ping the front end
        if (!newMessage.trim()) {
          return;
        }

        // send the message to the client
        const data = {
          message: newMessage,
          author: msg.member.displayName,
          color: msg.member.displayHexColor
        }

        axios.post('http://localhost:8080/message', data)
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
});

client.login(process.env.TOKEN);