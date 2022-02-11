# Discord / OBS Chat Overlay
Bringing a channel's messages into a nice looking chat overlay for OBS browser capture!

## Concept
Basically, OBS can accept any URL as a browser source, including `localhost` addresses. I'm taking advantage of this by running two Node.js instances: 1 for a Discord bot to watch for new messages and post them to the chat server, and another instance as a chat server to receive new messages and update the DOM.

The basic flow of information is: New Message Event > Discord bot > HTTP POST > server > socket > client-side javascript.

## Running the Overlay

After cloning this repo, create a file named `.env`, and insert the following:
```
TOKEN=<YOUR_SECRET_GOES_HERE>
WATCH_CHANNEL=<YOUR_CHANNEL_GOES_HERE>
```

To get the token, you'll need to create a Discord bot with the `Read Messages` permission. You can follow **just Step 1** here: [How To Build a Discord Bot with Node.js](https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js)

The channel value can be retrieved by [enabling Discord developer mode](https://techswift.org/2020/09/17/how-to-enable-developer-mode-in-discord/), then right-clicking the channel you'd like to watch and clicking "Copy ID".

Finally, you'll want to do:
```
npm install
```

Open two terminal instances. In one, run:
```
node client.js
```

Expect to see a message like `listening on *:8080`
You can now view the client by visiting http://localhost:8080.
**USE THIS URL AS YOUR BROWSER SOURCE** in OBS.

And in the other terminal, run:
```
node bot.js
```

Expect to see a message like `Logged in as <BOTNAME>#0000!`
With the bot watching your channel for new messages, AND the client running on http://localhost:8080, you should be all set up and good to go!