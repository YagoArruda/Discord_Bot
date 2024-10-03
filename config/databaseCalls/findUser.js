const user = require('../../models/userModel.js');

class Encontrar {
    constructor(db) {
        this.connection = db;
    }

    async encontrarUsuario(nome) {
        // Supondo que você queira buscar um usuário com globalName "Teste"
        const globalNameToFind = nome;

        try {
            const result = await user.findOne({ globalName: globalNameToFind });
            if (result) {
                //console.log("Usuário encontrado:", result);
                return result;
            } else {
                console.log("Usuário não encontrado.");
                return null;
            }
        }
        catch (err) {
            console.error("Erro ao buscar usuário:", err);
            throw err;
        }
    }
}

module.exports = Encontrar;
