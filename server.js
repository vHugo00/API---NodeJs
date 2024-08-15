import express from 'express';

// Inicializa o aplicativo Express
const app = express();

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Array para armazenar os usuários
const users = [];

// Rota POST para adicionar um novo usuário
app.post('/user', (req, res) => {
  // Adiciona o corpo da requisição (dados do usuário) ao array de usuários
  users.push(req.body);

  // Retorna uma resposta com status 201 (Criado) e o usuário adicionado em formato JSON
  res.status(201).json(req.body);
});

// Rota GET para retornar todos os usuários
app.get('/user', (req, res) => {
  // Retorna uma resposta com status 200 (OK) e a lista de usuários em formato JSON
  res.status(200).json(users);
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
