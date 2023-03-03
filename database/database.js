const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

//link gerado pelo mongodb não estava funcionando então pesquisei e usei esse novo para funcionar
function connectToDatabase() {
    mongoose.connect("mongodb://127.0.0.1:27017", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
}).then(() => {
    console.log("MONGO DB CONECTADO")
}).catch((err) => {
    return console.log(`Erro na conexão com o banco${err}`);
})

}

module.exports = connectToDatabase