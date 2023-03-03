const usuarioService = require("../service/usuario.service");
const mongoose = require("mongoose");

const find = async (req, res) => {

try{
  const id = mongoose.Types.ObjectId (req.params.id);
  let found = false;

  const usuario = await usuarioService.findByIdUsuario(id);

  if (usuario != null){
    found = true;
  }
    
    if (!found) {
      return res.status(404).send({ message: "ID não foi encontrado" });
    }
    return res.status(200).send(usuario); 
  

}catch(err){
    console.log(`erro: ${err}`)
    return res.status(500).send("erro no servidor.");

  }

};




const findAllUsers = async (req,res) =>{
    return res.status(200).send(await usuarioService.findAllUsuario());
};


const createUser = async (req, res) => {
    const usuario = req.body;
  
    if (Object.keys(usuario).length === 0) {
      return res.status(400).send({ message: "O corpo da mensagem esta vazio" });
    }
  
    if (!usuario.senha) {
      return res.status(400).send({ message: "Senha não encontrada" });
    }
  
    if (!usuario.nome) {
      return res.status(400).send({ message: "Nome não encontrado" });
    }
  
    if (!usuario.email) {
      return res.status(400).send({ message: "E-mail não encontrado" });
    }

    if (!usuario.idade) {
        return res.status(400).send({ message: "Idade não encontrado" });
      }
  
    return res.status(201).send(await usuarioService.createUsuario(usuario));
  };



  const updateUser = async (req, res) => {
    const id = req.params.id;
    const usuario = req.body;
    //let found = false;
  
    if (Object.keys(usuario).length === 0) {
      return res.status(400).send({ message: "O corpo da mensagem esta vazio" });
    }
  
    if (!usuario.senha) {
      return res.status(400).send({ message: "Senha não encontrada" });
    }
  
    if (!usuario.nome) {
      return res.status(400).send({ message: "Nome não encontrado" });
    }
  
    if (!usuario.email) {
      return res.status(400).send({ message: "E-mail não encontrado" });
    }

    if (!usuario.idade) {
        return res.status(400).send({ message: "Idade não encontrado" });
      }
  
      return res.status(200).send(await usuarioService.updateUsuario(id,usuario));

    };
    


  const deleteUser = async (req, res) => {
    const id = req.params.id;
  
    //let found = false;
  
    return res.status(200).send(await usuarioService.deleteUsuario(id));
  };
  




module.exports = {
    find,
    findAllUsers,
    createUser,
    updateUser,
    deleteUser

};