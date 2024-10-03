//Status: Funcionando 
//Data da ultima modificação: 02/10/2024
//Ultimo a atualizar: Yago
const { SlashCommandBuilder } = require('discord.js');
const userDataManagerRef = require("../config/databaseCalls/pontes/userManager.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName('bet')
        .setDescription('Aposta uma quantidade de pontos em uma roleta de 1 a 10')
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('A quantidade de pontos que você quer apostar')
                .setRequired(true)),  // Torna o campo obrigatório

    async execute(interaction, db) {
        // Obtém o valor que o usuário inseriu
        const quantidade = interaction.options.getInteger('quantidade');

        const userDataManager = new userDataManagerRef(db);
        let data = await userDataManager.encontrarUsuario(db, interaction.user.globalName);

        if (data.cash >= quantidade) {
            let num = Math.floor(Math.random() * 10) + 1;

            if (num == 7 || num == 2) {

                // Responde com uma mensagem utilizando o valor
                userDataManager.editarUsuario(db, data.globalName, (data.cash + (quantidade*2)), data.diaAtual);
                await interaction.reply(`**Rolagem: 🎲 ${num} \nValor apostado: 💰 ${quantidade}\n------------- \nRegras: \n 🟡 5: 3x \n 🟢 2 ou 7: 2x \n 🔴 Outros: Perde\n------------- \nResultado:  Você ganhou ${quantidade * 2}!! 🎉🎉🎉\nSaldo Antigo: ${data.cash}\nNovo Saldo: ${(data.cash + (quantidade*2))}**`);
            }
            else if (num == 5) {
                // Responde com uma mensagem utilizando o valor
                userDataManager.editarUsuario(db, data.globalName, (data.cash + (quantidade*3)), data.diaAtual);
                await interaction.reply(`**Rolagem: 🎲 ${num} \nValor apostado: 💰 ${quantidade}\n------------- \nRegras: \n 🟡 5: 3x \n 🟢 2 ou 7: 2x \n 🔴 Outros: Perde\n------------- \nResultado:  Você ganhou ${quantidade * 3}!! 🎉🎉🎉\nSaldo Antigo: ${data.cash}\nNovo Saldo: ${(data.cash + (quantidade*3))}**`);
            }
            else {
                // Responde com uma mensagem utilizando o valor
                userDataManager.editarUsuario(db, data.globalName, (data.cash - quantidade), data.diaAtual);
                await interaction.reply(`**Rolagem: 🎲 ${num} \nValor apostado: 💰 ${quantidade}\n------------- \nRegras: \n 🟡 5: 3x \n 🟢 2 ou 7: 2x \n 🔴 Outros: Perde\n------------- \nResultado: Perdeu! Não foi dessa vez, tente novamente! estou sentindo a sorte vindo 😉\nSaldo Antigo: ${data.cash}\nNovo Saldo: ${data.cash - quantidade}**`);
            }

        }
        else {
            await interaction.reply(`**Valor insuficiente para a aposta! você não tem ${quantidade}**`);
        }

    }

}
