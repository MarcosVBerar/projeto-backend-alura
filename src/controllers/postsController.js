import { atualizarPost, criarPost, getTodosPosts } from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Importa as funções para criar um post, obter todos os posts e todos os usuários do módulo 'postModel'.
// Importa o módulo 'fs' para realizar operações com o sistema de arquivos.

export async function listarPosts(req, res) {
  // Chama a função para obter todos os posts do banco de dados.
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (OK) e os posts em formato JSON.
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  // Extrai os dados do novo post do corpo da requisição.

  try {
    // Tenta criar um novo post no banco de dados usando os dados do novoPost.
    const postCriado = await criarPost(novoPost);
    // Envia uma resposta HTTP com status 200 (OK) e o post criado em formato JSON.
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante a criação do post.
    console.error(erro.message); // Imprime a mensagem de erro no console para depuração.
    // Envia uma resposta HTTP com status 500 (Erro Interno do Servidor) e uma mensagem de erro genérica.
    res.status(500).json({"Erro": "Falha na requisição"});
  }
}

export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname, // Utiliza o nome original do arquivo como URL da imagem
    alt: ""
  }; // Cria um objeto para representar o novo post, incluindo a URL da imagem.

  try {
    // Tenta criar um novo post no banco de dados com a imagem.
    const postCriado = await criarPost(novoPost);
    // Gera um novo nome para o arquivo da imagem, usando o ID do post criado.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.jpg`;
    // Renomeia o arquivo carregado para o novo nome, movendo-o para o diretório de uploads.
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (OK) e o post criado em formato JSON.
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante o processo de upload e criação do post.
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (Erro Interno do Servidor) e uma mensagem de erro genérica.
    res.status(500).json({"Erro": "Falha na requisição"});
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.jpg`
  
  
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.jpg`)
    const descricao = await gerarDescricaoComGemini(imgBuffer)

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    };
    const postCriado = await atualizarPost(id, post);
  
    res.status(200).json(postCriado)
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({"Erro": "Falha na requisição"});
  }
};
