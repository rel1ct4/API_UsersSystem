import express from "express";
import cors from "cors";
import { promises as fs } from "fs"; 

const PORT = 3333
const url_database = "./database/biblioteca.json"

const app = express()
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())

//concluido 2/31

//lista todos

app.get("/biblioteca/livros", async(req, res) => {
    //lista de livros da biblioteca
    try {
        const data = await fs.readFile(url_database,'utf-8')
        const database = await JSON.parse(data)

        if(database.livros.length === 0){
            res.status(200).json({mensagem: "Nenhum livro cadastrado!"})
            return
        }

        res.status(200).json({mensagem: "Lista de livros cadastrados:", data: database.livros})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem: "Internal server error!"})

    }
});

app.get("/biblioteca/usuarios", async(req, res) => {
    //lista de usuarios cadastrados
    try {
        const data = await fs.readFile(url_database, 'utf-8')
        const database = await JSON.parse(data)

        if(database.users.length === 0){
            res.status(200).json({mensagem: "Nenhum usuário cadastrado!"})
            return
        }

        res.status(200).json({mensagem: "Lista de usuários cadastrados:", data: database.users})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem: "Internal server error"})
    }
});

app.get("/biblioteca/emprestimos", async(req, res) => {
    //lista de emprestimos 
    try {
        const data = await fs.readFile(url_database, 'utf-8')
        const database = await JSON.parse(data)

        const livrosEmprestimo = database.livros.status.filter((status) => status === "ativo")
        if(livrosEmprestimo.length === 0){
            res.status(200).json({mensagem: "Nenhum livro disponivel para emprestimo no momento, tente reservar algum!"})
        }

        res.status(200).json({mensagem: "Lista de livros emprestados:"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem: "Internal server error!"})
    }
});

app.get("/biblioteca/reservas", async(req, res) => {});

app.get("/biblioteca/multas", async(req, res) => {});

//cria todos

app.post("/biblioteca/usuarios/cadastro", async(req, res) => {});

app.post("/biblioteca/livros/cadastro", async(req, res) => {});

app.post("/biblioteca/emprestimos", async(req, res) => {});

app.post("/biblioteca/reservas", async(req, res) => {});

app.post("/biblioteca/multas/registrar/:emprestimoId", async(req, res) => {});

//lista um em especifico

app.get("/biblioteca/usuarios/:id", (req, res) => {});

app.get("/biblioteca/livros/:id", (req, res) => {});

app.get("/biblioteca/emprestimos/:id", (req, res) => {});

app.get("/biblioteca/reservas/:id", (req, res) => {});

app.get("/biblioteca/multas/:emprestimoId", (req, res) => {});

//atualiza as informações de determinado item

app.put("/biblioteca/usuarios/:id", (req, res) => {});

app.put("/biblioteca/livros/:id", (req, res) => {});

app.put("/biblioteca/emprestimos/:id/devolucao", (req, res) => {});

app.put("/biblioteca/multas/:id/pagar", (req, res) => {});

app.put("/biblioteca/reservas/:id", (req, res) => {});

//deletar um item

app.delete("/biblioteca/usuarios/:id", (req, res) => {});

app.delete("/biblioteca/livros/:id", (req, res) => {});

app.delete("/biblioteca/emprestimos/:id/devolucao", (req, res) => {});

app.delete("/biblioteca/multas/:id/pagar", (req, res) => {});

app.delete("/biblioteca/reservas/:id", (req, res) => {});

//outras funções de listagem especifica ou não

app.get("/biblioteca/emprestimos/:id", (req, res) => {});

app.get("/biblioteca/emprestimos/usuario/:id", (req, res) => {});

app.get("/biblioteca/emprestimos/pendentes", (req, res) => {});

app.get("/biblioteca/reservas/usuario/:id", (req, res) => {});

app.get("/biblioteca/reservas/disponiveis/:idLivro", (req, res) => {});

app.get("/biblioteca/livros/busca", async (req, res) => {
  // Acesse os parâmetros de query string via req.query
  const { titulo, autor, categoria, ISBN } = req.query;

  try {
    const data = await fs.readFile(url_database, 'utf-8');
    const database = JSON.parse(data);
    let livrosFiltrados = database.livros;

    if (titulo) {
      livrosFiltrados = livrosFiltrados.filter(livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
    }
    if (autor) {
      livrosFiltrados = livrosFiltrados.filter(livro => livro.autor.toLowerCase().includes(autor.toLowerCase()));
    }
    if (categoria) {
      livrosFiltrados = livrosFiltrados.filter(livro => livro.categoria.toLowerCase().includes(categoria.toLowerCase()));
    }
    if (ISBN) {
      livrosFiltrados = livrosFiltrados.filter(livro => livro.ISBN.includes(ISBN));
    }

    if (livrosFiltrados.length === 0) {
      return res.status(200).json({ mensagem: "Nenhum livro encontrado com os critérios fornecidos." });
    }

    res.status(200).json({ mensagem: "Livros encontrados", data: livrosFiltrados });

  } catch (error) {
    console.error(error); // Use console.error para erros
    res.status(500).json({ mensagem: "Erro interno do servidor ao buscar livros." });
  }
});

app.get("/biblioteca/multas/usuario/:id", (req, res) => {});


app.listen(PORT, () => {
    console.log("Servidor iniciado na porta: " + PORT)
})