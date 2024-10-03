//cria os dados
const userJS = require('../../user.js');
const Editar = require('../updateUser.js');

class userDataManager{
    
    constructor(db){
        this.connection = db;
    }

    criarUsuario(db, nome) {
        const criadorUser = new userJS(db);
    
        criadorUser.criarUsuario(nome);
        console.log("novo usuario criado: " + nome);
    }
    
    editarUsuario(db, nome, cash, dia) {
    
        let edit = new Editar(db);
    
        edit.editarUsuario(nome, cash, dia);
    }
    
    encontrarUsuario(db, nome) {
        const Encontrar = require('../findUser.js')
        const user = new Encontrar(db);
    
        let res = user.encontrarUsuario(nome);
        return res;
    }
}

module.exports = userDataManager;

