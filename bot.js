require('dotenv').config();
const axios = require('axios');

const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

// HTTP CLIENT
const httpClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});


// BOT LOGIC
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on("messageCreate", msg => {
    // below is the channel ID of the channel that I want to target
    if (msg.channel.id == process.env.WATCH_CHANNEL) {
        // DO THE THING
        console.log(msg.content);
        httpClient.post('/message', {
          message: msg.content,
          author: msg.author.username
        })
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          // console.log(error);
        });
    }
});

client.login(process.env.TOKEN);