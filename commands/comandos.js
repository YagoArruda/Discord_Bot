//Status: Funcionando 
//Data da ultima modificação: 02/10/2024
//Ultimo a atualizar: Yago
const { SlashCommandBuilder } = require('discord.js');
const userDataManagerRef = require("../config/databaseCalls/pontes/userManager.js");
const { parse } = require('dotenv');

module.exports = {

  data: new SlashCommandBuilder()
    .setName('comandos')
    .setDescription('Mostra suas informações'),

  async execute(interaction, db) {

    const userDataManager = new userDataManagerRef(db);
    let data = await userDataManager.encontrarUsuario(db, interaction.user.globalName);

    await interaction.reply(`
            Aqui estão os comandos ${interaction.user}:\n
          **### Comuns ###**\n
            **/comandos**: Mostra os comandos\n
            **/daily**: Ganha uma pequena quantidade de pontos\n
            **/sobre**: Mostra as informações do usuario\n
            **/ping**: O bot retorna Pong!\n
          **### Jogos ###**\n
            **/bet**: Aposta na roleta\n
            **/baze**: Aposta no avião\n
            **/zebra**: Aposta na corrida de zebras\n
          **### Em Produção ###**\n
            **/migo**: #---| Ainda em produção |---#\n
            `);
  }

}
