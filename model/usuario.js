const mongoose = require("mongoose");

//criar schema para organizar as informações que vao para o banco de dados
const usuarioSchema = new mongoose.Schema({
    nome: { type: String, unique: true, required: true},
    idade: { type: Number, required: true},
    email: {type: String, unique: true, required: true},
    senha: { type: String, required: true},   
    token: {type: String, required: true}, 
});

const Usuario = mongoose.model("usuarios", usuarioSchema);

module.exports = Usuario;
