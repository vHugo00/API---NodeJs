
---

## Descrição do Código

Este projeto é uma aplicação básica utilizando **Node.js** com o framework **Express** e o ORM **Prisma** para interações com o banco de dados. A aplicação oferece uma API simples para gerenciamento de usuários, permitindo adicionar, listar, atualizar e deletar usuários via requisições HTTP.

### Funcionalidades:

- **Adicionar Usuário**: A aplicação permite adicionar novos usuários através de uma requisição HTTP POST.
- **Listar Usuários**: A aplicação retorna todos os usuários armazenados via uma requisição HTTP GET.
- **Atualizar Usuário**: A aplicação permite atualizar as informações de um usuário existente através de uma requisição HTTP PUT.
- **Deletar Usuário**: A aplicação permite deletar um usuário existente através de uma requisição HTTP DELETE.

### Estrutura do Código:

1. **Importação do Express e Prisma**:
   ```javascript
   import express from 'express';
   import { PrismaClient } from '@prisma/client';
   ```
   - O Express é importado para criar e configurar o servidor web. O PrismaClient é importado para interagir com o banco de dados.

2. **Inicialização do Prisma e do Servidor**:
   ```javascript
   const prisma = new PrismaClient();
   const app = express();
   ```
   - A constante `prisma` é inicializada com uma instância do PrismaClient, que será usada para acessar o banco de dados. A constante `app` é inicializada com a instância do Express.

3. **Middleware para JSON**:
   ```javascript
   app.use(express.json());
   ```
   - Este middleware permite que a aplicação processe requisições com corpos de dados no formato JSON, o que é essencial para manipular dados enviados via POST ou PUT.

4. **Rota POST para Adicionar Usuários**:
   ```javascript
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
   ```
   - Esta rota recebe os dados de um novo usuário no corpo da requisição (via `req.body`) e os insere no banco de dados. A resposta retorna o usuário criado com um status HTTP 201 (Criado).

5. **Rota GET para Listar Usuários**:
   ```javascript
   app.get('/user', async (req, res) => {
     try {
       const users = await prisma.user.findMany();
       res.status(200).json(users);
     } catch (error) {
       res.status(500).json({ error: 'Erro ao buscar usuários' });
     }
   });
   ```
   - Esta rota retorna todos os usuários armazenados no banco de dados em formato JSON, com um status HTTP 200 (OK).

6. **Rota PUT para Atualizar Usuários**:
   ```javascript
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
   ```
   - Esta rota permite atualizar as informações de um usuário existente no banco de dados, utilizando o ID do usuário como parâmetro.

7. **Rota DELETE para Remover Usuários**:
   ```javascript
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
   ```
   - Esta rota permite remover um usuário existente no banco de dados, utilizando o ID do usuário como parâmetro.

8. **Inicialização do Servidor**:
   ```javascript
   app.listen(3000, () => {
     console.log('Servidor rodando na porta 3000');
   });
   ```
   - O servidor é configurado para rodar na porta 3000, e uma mensagem de confirmação é exibida no console para indicar que o servidor está em funcionamento.

### Como Executar

Para executar esta aplicação:

1. Certifique-se de ter o Node.js instalado.
2. Instale as dependências com o comando:
   ```bash
   npm install
   ```
3. Configure o Prisma e o banco de dados:
   - Execute o comando para inicializar o Prisma:
     ```bash
     npx prisma init
     ```
   - Defina a string de conexão com o banco de dados em `.env`.
   - Execute a migração para criar as tabelas no banco de dados:
     ```bash
     npx prisma migrate dev --name init
     ```
4. Inicie o servidor com:
   ```bash
   node --watch server.js
   ```
5. Acesse a aplicação em `http://localhost:3000`.

### Dependências

- **express**: Framework web para Node.js.
- **@prisma/client**: Cliente do Prisma para interagir com o banco de dados.

### Estrutura do Projeto

- `server.js`: Arquivo principal que contém a lógica do servidor e as rotas da API.
- `.env`: Arquivo de configuração para variáveis de ambiente, como a string de conexão do banco de dados.
- `prisma/schema.prisma`: Arquivo de configuração do Prisma que define o esquema do banco de dados.

---
