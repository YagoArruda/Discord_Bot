// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection, ActivityType} = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN } = process.env;

//
const dataBase = require('./config/database.js')
const db = new dataBase;

db.connect();

//comandos
const fs = require('node:fs');
const path = require('node:path');
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    }
    else {
        console.log(`Comando ${filePath} possui DATA ou EXECUTE invalidos!`);
    }
}

client.once('ready', () => {
    client.user.setActivity('Você 👀...', { type: ActivityType.Watching });
});


// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
    //seta a ativiade
    console.log(`${readyClient.user.tag} está no ar! 🚀`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

//interacoes (listener)
client.on(Events.InteractionCreate, async interaction => {
    //console.log(interaction.user.globalName)
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error("comando não encontrado")
        return
    }

    try {
        await command.execute(interaction, db);
    }
    catch (error) {
        console.error(error);
        await interaction.reply("Não foi possivel executar")
    }
})

