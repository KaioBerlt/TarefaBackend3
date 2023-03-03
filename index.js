const express = require ("express");

const app = express();
const authService = require("./service/auth.service");
const usuario = require("./router/user.router");
const connectToDatabase = require("./database/database");
const jwt = require("jsonwebtoken")

connectToDatabase();

const port = 3001;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);

});

const segredo = "123abc"

app.use(express.json());

app.use("/usuario", usuario);


app.get("/", (req,res) => {
    res.send("Inicio");
});

app.post("/login", async (req, res)=> {
    try{
    const { email, senha } = req.body;
    const user = await authService.loginService(email);

    if (!user){
        return res.status(400).send({ message: "Usuário Não Encontrado"});
    }

    if (senha != user.senha){
        return res.status(400).send({ message: "Senha Incorreta"});
    }

    const token = authService.generateToken(user, segredo);
    res.status(200).send({
        user,
        token
    });

    }catch(err){
    console.log(`erro: ${err}`);
}
});

app.get("/validar-token" , (req,res) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ message: "Token Não Informado"});
    }
    const parts = authHeader.split(" ");

    if (parts.length !== 2){
        return res.status(401).send({ message: "Token Invalido"});
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ message: "Token malformatado"});
    }

    jwt.verify(token, segredo, (err, decoded) => {
        
        if(err){
            console.log(`erro: ${err}`);
            return res.status(500).send({ message: "erro interno"});
        }
        
      //  console.log(decoded);
        res.send(decoded);
    })
});

