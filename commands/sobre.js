//Status: Funcionando 
//Data da ultima modificação: 02/10/2024
//Ultimo a atualizar: Yago
const { SlashCommandBuilder } = require('discord.js');
const userDataManagerRef = require("../config/databaseCalls/pontes/userManager.js");
const { parse } = require('dotenv');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('sobre')
        .setDescription('Mostra suas informações'),

    async execute(interaction, db) {

        const userDataManager = new userDataManagerRef(db);
        let data = await userDataManager.encontrarUsuario(db, interaction.user.globalName);

        await interaction.reply(`**Nome: ${data.globalName}\nNome no servidor: ${interaction.user.username}\n-------------\nPontos: 💰 ${data.cash}**`);
    }

}
