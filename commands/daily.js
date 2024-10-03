//Status: Funcionando 
//Data da ultima modificação: 02/10/2024
//Ultimo a atualizar: Yago
const { SlashCommandBuilder } = require('discord.js');
const userDataManagerRef = require("../config/databaseCalls/pontes/userManager.js");


module.exports = {

    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Recebe a recompença diaria'),

    async execute(interaction, db) {

        const hoje = new Date();
        const diaAtual = hoje.getDate();

        const userDataManager = new userDataManagerRef(db);

        let data = await userDataManager.encontrarUsuario(db, interaction.user.globalName);

        if (data.lastDaily.toString() == diaAtual.toString()) {
            await interaction.reply("Já recebeu o daily de hoje!");
        }
        else {
            if (data != null && data.globalName == interaction.user.globalName) {    
                //faz o daily
                userDataManager.editarUsuario(db, interaction.user.globalName, (data.cash + 50), diaAtual);
            }
            else {
                //cria os dados
                userDataManager.criarUsuario(db, interaction.user.globalName);

                //faz o daily
                userDataManager.editarUsuario(db, interaction.user.globalName, (data.cash + 50), diaAtual);
            }

            await interaction.reply(`**${interaction.user} você recebeu 50 pontos!\nSaldo Antigo: ${data.cash}\nNovo Saldo: ${data.cash + 50}**`);
        }

    }

}
