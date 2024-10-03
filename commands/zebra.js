const { SlashCommandBuilder } = require('discord.js');
const userDataManagerRef = require("../config/databaseCalls/pontes/userManager.js");

module.exports = {

    data: new SlashCommandBuilder()
        .setName('zebra')
        .setDescription('Aposta uma quantidade de pontos em uma corrida de zebras')
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('A quantidade de pontos que você quer apostar')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('zebra')
                .setDescription('Número da zebra de 1 a 4')
                .setRequired(true)),
        

    async execute(interaction, db) {
        // Obtém o valor que o usuário inseriu
        const quantidade = interaction.options.getInteger('quantidade');
        const zebra = interaction.options.getInteger('zebra') -1;

        const userDataManager = new userDataManagerRef(db);
        let data = await userDataManager.encontrarUsuario(db, interaction.user.globalName);

        if (data.cash >= quantidade) {

            if(zebra < 5 || zebra > 1){

                let num = Math.floor(Math.random() * 4) + 1;

                const zebras = ["Zuzu - 1", "Azul - 2", "Zuly - 3", "Ximão - 4"];
        
                if (num == zebra) {
                    const saldo = parseFloat((data.cash + parseFloat((quantidade * 0.20).toFixed(2))).toFixed(2));
                    userDataManager.editarUsuario(db, data.globalName, saldo, data.diaAtual);
                    await interaction.reply(`**Mega corrida de Zebras\n-------------\nCorredores:\n🦓 Zuzu - 1\n🦓 Azul - 2\n🦓 Zuly - 3\n🦓 Ximão - 4\n-------------\nSua aposta: 🦓 ${zebras[zebra]}\nValor: 💰 ${quantidade}\n-------------\nVencedor: 🦓 ${zebras[num]}\nResultado: Você ganhou ${(quantidade * 0.20).toFixed(2)}!!\nSaldo Antigo: ${data.cash}\nNovo Saldo: ${saldo}**`);
                }
                else {
                    userDataManager.editarUsuario(db, data.globalName, (data.cash - quantidade), data.diaAtual);
                    await interaction.reply(`**Mega corrida de Zebras\n-------------\nCorredores:\n🦓 Zuzu - 1\n🦓 Azul - 2\n🦓 Zuly - 3\n🦓 Ximão - 4\n-------------\nSua aposta: 🦓 ${zebras[zebra]}\nValor: 💰 ${quantidade}\n-------------\nVencedor: 🦓 ${zebras[num]}\nResultado: Perdeu!!!\nSaldo Antigo: ${data.cash}\nNovo saldo: ${(data.cash - quantidade)}**`);
                }
            }
            else{
                await interaction.reply(`**A Zebra escolhida não é uma corredora!**`);
            }

        }
        else {
            await interaction.reply(`**Valor insuficiente para a aposta! você não tem ${quantidade}**`);
        }

    }

}
