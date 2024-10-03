const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('migo')
        .setDescription('....'),

    async execute(interaction) {
        // Obtém o valor que o usuário inseriu

       await interaction.reply(`Não faz nada **ainda**, quem sabe outro dia! 😉`);

    }

}
