//Status: Funcionando 
//Data da ultima modificação: 02/10/2024
//Ultimo a atualizar: Yago
const { SlashCommandBuilder } = require('discord.js');
const userDataManagerRef = require("../config/databaseCalls/pontes/userManager.js");
const { parse } = require('dotenv');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('baze')
        .setDescription('Aposta uma quantidade de pontos no avião da baze')
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
            const date = new Date();
            let hora = date.getHours();
            const unidadeHora = hora % 10;

            let mult = ((((unidadeHora / 10) + 1) * 0.5) + 0.15)//(Math.floor(Math.random() * 3) + 0.1) * 0.27; //((hora / 10) * 0, 25) + ((hora - (hora / 10)) * 0, 65)

            const saldo = 0;
            if (num >= 8) {

                // Responde com uma mensagem utilizando o valor
                saldo = (data.cash + parseFloat((quantidade * mult).toFixed(2)));
                userDataManager.editarUsuario(db, data.globalName, (data.cash + parseFloat((quantidade * mult).toFixed(2))), data.diaAtual);
                await interaction.reply(`**O avião subiu! 🛫\nValor apostado: 💰 ${quantidade}\n-------------\nMultiplicador atual: ${mult.toFixed(2)}\n------------- \nResultado: Você ganhou ${(quantidade * mult).toFixed(2)}!! 🎉🎉🎉\nSaldo Antigo: ${data.cash}\nNovo Saldo: ${saldo}**`);
            }
            else if (num > 2 && num < 4) {
                // Responde com uma mensagem utilizando o valor
                saldo = (data.cash + parseFloat((quantidade * (mult* 1.25)).toFixed(2)));
                userDataManager.editarUsuario(db, data.globalName, saldo, data.diaAtual);
                await interaction.reply(`**Foguete dourado! 🚀\nValor apostado: 💰 ${quantidade}\n-------------\nMultiplicador atual: ${(mult * 1.25).toFixed(2)}\n------------- \nResultado: Você ganhou ${(quantidade * mult * 1.25).toFixed(2)}!! 🎉🎉🎉\nSaldo Antigo: ${data.cash}\nNovo Saldo: ${saldo}**`);
            }
            else {
                // Responde com uma mensagem utilizando o valor
                userDataManager.editarUsuario(db, data.globalName, (data.cash - quantidade), data.diaAtual);
                await interaction.reply(`**O avião desceu! 🛬\nValor apostado: 💰 ${quantidade}\n-------------\nMultiplicador atual: ${mult.toFixed(2)}\n------------- \nResultado: Você perdeu!\nSaldo Antigo: ${data.cash}\nNovo Saldo: ${data.cash - quantidade}**`);
            }
        }
        else {
            await interaction.reply(`**Valor insuficiente para a aposta! você não tem ${quantidade}**`);
        }
    }

}
