const user = require('../models/userModel.js')
/*
const dataBase = require('./database.js')
const db = new dataBase;

db.connect();
*/
class Usuario {
    constructor(db) {
        this.connection = db;
    }

    criarUsuario(nome) {
        user.create({
            globalName: nome,
            cash: 0,
            lastDaily: 0,
        })
    }
}

module.exports = Usuario;
