const user = require('../../models/userModel.js');

class Editar {
    constructor(db) {
        this.connection = db;
    }

    async editarUsuario(nome, novoCash, novoDaily) {
        // Supondo que você queira buscar um usuário com globalName "Teste"
        const globalNameToFind = nome;

        try {
            const result = await user.findOneAndUpdate(
                { globalName: globalNameToFind }, // Filtro para encontrar o usuário
                { $set: { cash: novoCash, lastDaily: novoDaily} }, // Dados a serem atualizados
                { new: true } // Retorna o documento atualizado
            );
            if (result) {
                //console.log("Usuário encontrado:", result);
                return result;
            } else {
                console.log("Usuário não encontrado para atualizar.");
                return null;
            }
        }
        catch (err) {
            console.error("Erro ao editar usuário:", err);
            throw err;
        }
    }
}

module.exports = Editar;
