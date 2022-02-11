// MIT License

// Copyright (c) 2022 David Fletcher

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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