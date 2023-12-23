require('dotenv').config();
const { Events, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const connectDB = require("./config/db.config");
const path = require('path');
const discord = require('discord.js');
const client = new discord.Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers,GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites]
});
// registering commands
client.commands = new Map();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}





client.on('ready', () => {
    connectDB(process.env.MONGO_URI);
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('GDSC activities', { type: 'WATCHING' });
    
});



client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
    try{
    await client.commands.get(interaction.commandName).execute(interaction, client);
    }
    catch(err){
        console.log(err);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: false });
    }
});
const announce = require('./helpers/announce');

client.on(Events.MessageCreate, async message => {
    await announce(message, client);
});




        
client.login(process.env.BOT_TOKEN);