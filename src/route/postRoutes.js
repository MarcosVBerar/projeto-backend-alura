import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Importa as funções controladoras para lidar com a lógica de posts e usuários
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

// Configura o armazenamento em disco do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Especifica o diretório para salvar os arquivos carregados (ajuste conforme necessário)
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    // Usa o nome original do arquivo para manter a clareza (considere alternativas para segurança)
    cb(null, file.originalname);
  },
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ storage });

const routes = (app) => {
  // Habilita o parsing de dados JSON em corpos de requisições
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota para obter todos os posts
  app.get("/posts", listarPosts); // Chama a função controladora listarPosts

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost); // Chama a função controladora postarNovoPost

  // Rota para upload de imagens com o middleware Multer
  app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função controladora uploadImagem com a imagem carregada

  app.put("/upload/:id", atualizarNovoPost)


};

export default routes;