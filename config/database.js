/*takudb
mDFrFTikjjUiGR6W*/

const mongoose = require('mongoose')

class Database {
    constructor() {
        this.connection = null;
    }

    connect() {
        const mongo_url = "mongodb+srv://takudb:mDFrFTikjjUiGR6W@takudb.ke3sy.mongodb.net/taku_usuarios?retryWrites=true&w=majority";//"mongodb+srv://takudb:mDFrFTikjjUiGR6W@takudb.ke3sy.mongodb.net/?retryWrites=true&w=majority&appName=TakuDB"
        console.log("------\nTentando conexão ao banco de dados.....")
        mongoose.connect(mongo_url, {/*
        useNewUrlParser:true,
        useUnifiedTopology: true,*/
        }).then(() => {
            console.log("Conectado ao banco de dados\n------")
            this.connection = mongoose.connection
        }).catch(error => {
            console.error(error)
        })
    }
}

module.exports = Database;