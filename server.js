import express from "express";
import cors from "cors";
import nodemon from "nodemon";
import fs from "node:fs"

const PORT = 3333
const app = express()
const url_database = "./database/bancoDeDados.json"

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())

app.listen(PORT, () => {
    console.log("Servidor funcionando no link 'http://localhost:3333")
});

app.get("/users", (req, res) => {
    fs.readFile(url_database, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).json({ mensagem: "Erro ao ler arquivo" })
                return
            }
    
            const usuarios = JSON.parse(data)
    
            if (!usuarios) {
                res.status(200).json({ mensagem: "Nenhum usuario encontrado", data: [] })
                return
            }
    
            res.status(200).json({ mensagem: "Lista de usuarios", data: usuarios.users })
        })

})

app.post("/users", (req, res)=>{
    const {name, email, password} = req.body

if(!name || typeof name !== 'string' || name.trim() === ""){
    res
    .status(400)
    .json({menssagem: "O campo 'nome' é obrigatorio e deve ser um texto"})
    return;
}

if(!email || typeof email !== 'string' || email.trim() === ""){
    res
    .status(400)
    .json({menssagem: "O campo 'email' é obrigatorio e deve ser um texto"})
    return;
}

if(!password || typeof password !== 'string' || password.trim() === ""){
    res
    .status(400)
    .json({menssagem: "O campo 'email' é obrigatorio e deve ser um texto"})
    return;
}




 fs.readFile(url_database, 'utf-8', (err, data)=>{
    if(err){
        res.status(500).json({mensagem: "Erro ao ler arquivo"})
        return
    }

    const usuarios = JSON.parse(data);

    if (!usuarios.users) {
        usuarios.users = [];
    }

    const novoUsuario = {
        id: Date.now().toString(),
        name,
        email,
        password
    };

    usuarios.users.push(novoUsuario);

        fs.writeFile(url_database, JSON.stringify(usuarios, null, 2), (err) => {
        if (err) {
            res.status(500).json({ mensagem: "Erro ao cadastrar usuario" })
            return
        }
        res.status(201).json({ mensagem: "Usuario cadastrado", data: novoUsuario })
    })
})
})

app.post("/posts", (req, res) => {
    const {userid, title, content} = req.body

    if(!userid){
        res
        .status(400)
        .json({menssagem: "O campo 'userid' é obrigatorio"})
        return;
    }
    
    if(!title || typeof title !== 'string' || title.trim() === ""){
        res
        .status(400)
        .json({menssagem: "O campo 'title' é obrigatorio e deve ser um texto"})
        return;
    }
    
    if(!content || typeof content !== 'string' || content.trim() === ""){
        res
        .status(400)
        .json({menssagem: "O campo 'content' é obrigatorio e deve ser um texto"})
        return;
    }
    
    
    
    
     fs.readFile(url_database, 'utf-8', (err, data)=>{
        if(err){
            res.status(500).json({mensagem: "Erro ao ler arquivo"})
            return
        }
    
        const Postagens = JSON.parse(data)

        if(!Postagens.posts){
            Postagens.posts = [];
        }
    
        const novoPost = {
            id: Date.now().toString(),
            userid,
            title,
            content
           
        };

    
            Postagens.posts.push(novoPost);
    
            fs.writeFile(url_database, JSON.stringify(Postagens, null, 2), (err) => {
            if (err) {
                res.status(500).json({ mensagem: "Erro ao criar um post" })
                return
            }
            res.status(201).json({ mensagem: "Post na internet ", data: novoPost })
        })
    })
});

app.get("/posts/:id/comments", (req, res) => {
    const {id} = req.params
    const {comments} = req.params
        
    fs.readFile(url_database, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ mensagem: "Erro ao ler arquivo" })
            return
        }

        const usuarios = JSON.parse(data)

        const indexUsuarios = usuarios.findIndex((usuarios) => usuarios.id === id)

        if(indexUsuarios === -1){
            res.status(404).json({mensagem: "Usuário não encontrado"})
            return
        }

        if (!usuarios) {
            res.status(200).json({ mensagem: "Esse post não teve nenhum comentário", data: [] })
            return
        }
        res.status(200).json({ mensagem: "comentários", data: usuarios.id.comments })
    })
});

app.get("/users/:id/feed", (req, res) => {
   
    fs.readFile(url_database, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({ mensagem: "Erro ao ler arquivo" })
            return
        }

        const usuarios = JSON.parse(data)

        if (!usuarios) {
            res.status(200).json({ mensagem: "Esse usuário não tem nenhum post", data: [] })
            return
        }
       
        res.status(200).json({ mensagem: "feed", data: usuarios.posts })
        console.log(data)
    })
})


app.delete("/users/:id", (req, res) => {
    const {id} = req.params

    fs.readFile(url_database, "utf-8", (err, data) => {
        if(err){
            res.status(500).json({mensagem: "Erro ao ler arquivo"})
            return
        }
         
        const usuarios = JSON.parse(data)
        console.log(usuarios)
        const indexUsuarios = usuarios.findIndex((usuarios) => usuarios.id === id)

        if(indexUsuarios === -1){
            res.status(404).json({mensagem: "Usuário não encontrado"})
            return
        }

        const usuarioRemovido = usuarios.splice(indexUsuarios, 1)[0]

        fs.writeFile(url_database, JSON.stringify(usuarios, null, 2), (err) => {
            if(err){
                console.log(err)
                res.status(500).json({mensagem: "Erro ao salvar arquivo"})
                return
            }
            res.status(200).json({mensagem: "Usuário e dados relacionados removidos com sucesso", data: usuarioRemovido})
        })
    })
});