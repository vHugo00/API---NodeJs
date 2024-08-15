import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Inicializa o aplicativo Express
const app = express();

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Rota POST para adicionar um novo usuário
app.post('/user', async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Rota GET para retornar todos os usuários
app.get('/user', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Rota PUT para atualizar um usuário pelo ID
app.put('/user/:id', async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Rota DELETE para remover um usuário pelo ID
app.delete('/user/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json({ message: 'Usuário deletado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
