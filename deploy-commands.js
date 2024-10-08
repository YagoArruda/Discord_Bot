const { REST, Routes } = require('discord.js');

//dotenv
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

//importação comandos
const fs = require('node:fs');
const path = require('node:path');
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

//instancia rest
const rest = new REST({ version: "10" }).setToken(TOKEN);

//deploy
(async () => {
    console.log(`iniciando deploy....`);
    try {
        console.log(`resetando ${commands.length} comandos....`);

        //put
        const data = await rest.put(
            Routes.applicationCommands(CLIENT_ID),//Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),//O Guild ID faz funcionar somente em um servidor
            { body: commands }
        )
        console.log("Comandos registrados")
    }
    catch (error) {
        console.error(error);
        console.log("algo deu errado...");
    }
})();