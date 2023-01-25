## 📖 Introdução

Projeto 'To-Do-List' é uma API de gestão de tarefas de uma empresa, onde deve ser possível cadastrar membros e tarefas da equipe.

Membros só precisarão de nome, e-mail e senha, enquanto tarefas terão título, descrição, data de criação e seu status se está feita ou não. Cada tarefa inicia sem responsável, mas também é possível atribuir mais de uma pessoa responsável para a mesma tarefa.

Para acessar a documentação, [clique aqui!](https://documenter.getpostman.com/view/24460616/2s8ZDczKaS)

## 📄 Descrição

### Instalando as dependências:
- npm install: Instala todas as dependências listadas no package.json;
- npm i cors: biblioteca para liberar acesso externo ao servido;
- npm i express : framework para criar o servidor (API);
- npm i knex: biblioteca query builder para conectar com banco de dados
- npm i sqlite3: biblioteca do banco de dados SQLite

### Executando o projeto
- npm run dev: Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor localhost toda a vez que o projeto for alterado e salvo.

### Endpoints
- Ping: Endpoint de teste da API;
- GetAllUsers: Realiza a busca de todos os usuários cadastrados na Base de Dados;
- PostUser: Insere os dados de usuários na Base de Dados;
- DeleteUser: Deleta o usuário da Base de Dados pelo número de id do usuário por meio de 'params';
- GetAllUsersWithTasks: Retorna todas as tarefas, demonstrando os usuários responsáveis por ela;
- GetTasks: Realiza a busca de todas as tarefas cadastradas na Base de Dados;
- PostTask: Insere os dados da tarefa na Base de Dados, com Data de Criação e Status atualizado automaticamente;
- PutTaskbyid: Atualiza tarefa com base na "id" da tarefa localizada via params;
- DelTaskbyid: Exclui a tarefa com base na "id" informada via params;

## 💻 Tecnologias 

![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

### Programas utilizados:
- Postman API Platform
- VSCode

## 📫 Contato

E-mail: emidio.daniel@hotmail.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danielemidio1988/)
[![Codewars](https://img.shields.io/badge/Codewars-B1361E?style=for-the-badge&logo=Codewars&logoColor=white)](https://www.codewars.com/users/DanielEmidio1988)