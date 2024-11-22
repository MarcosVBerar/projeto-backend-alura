import express, { json } from "express";
import routes from "./src/route/postRoutes.js";

// Cria uma instância do Express, que será o núcleo do nosso servidor web
const app = express();
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo
app.listen(3000, () => {
    console.log("Servidor escutando...");
});




// Exercício aula 1:
// import dados from './livro.json' assert { type: 'json'};

// app.get("/livro", (req, res) => {
//     res.status(200).send(dados
//       );
// });

//Exercicio aula 2: (***este código precisa estar antes da rota de busca por ID***)
// app.get('/posts/random', (req, res) => {
//     const randomIndex = Math.floor(Math.random() * posts.length);
//     const randomPost = posts[randomIndex];
//     // console.log(randomPost);
//     res.status(200).json(randomPost);
// });