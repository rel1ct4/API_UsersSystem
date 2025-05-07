# Sistema de Usuários, Posts e Comentários

## 📌 1. Contexto
O sistema a ser desenvolvido é uma API RESTful destinada ao gerenciamento de
usuários, postagens e comentários. Ele simula um blog simples, com autenticação
básica, permitindo que usuários possam publicar conteúdos e interagir por meio
de comentários. Esse sistema é ideal para fins educacionais e prática de
desenvolvimento com Node.js, Express e TypeScript.

## 🎯 2. Objetivos do Sistema
Permitir o cadastro e gerenciamento de usuários.
Permitir que usuários criem e editem posts.
Permitir que usuários comentem em posts de outros usuários.
Possibilitar a visualização de feeds personalizados e exclusão de dados
relacionados.

## 🔗 3.
Endpoints da API

1. GET /users
Pontuação: 0,33
Descrição: Retorna todos os usuários cadastrados.
Resposta 200:
[
 {
Sistema de Usuários, Posts e Comentários 1
 "id": 1,
 "name": "João Silva",
 "email": "joao@email.com"
 }
]

2. POST /posts
Pontuação: 0,33
Descrição: Cria um novo post associado a um usuário.
Request Body:
{
 "userId": 1,
 "title": "Novo post",
 "content": "Conteúdo do post"
}
Resposta 201:
{
 "id": 3,
 "userId": 1,
 "title": "Novo post",
 "content": "Conteúdo do post",
 "createdAt": "2025-05-06T13:00:00Z"
}

3. GET /posts/:id/comments
Pontuação: 0,33
Descrição: Retorna todos os comentários relacionados a um post.
Parâmetros:
id (path): ID do post
Sistema de Usuários, Posts e Comentários 2
Resposta 200:
[
 {
 "id": 1,
 "postId": 1,
 "userId": 2,
 "comment": "Muito bom o post!",
 "createdAt": "2025-05-06T11:30:00Z"
 }
]

4. PUT /users/:id
Pontuação: 0,33
Descrição: Atualiza nome e e-mail de um usuário.
Parâmetros:
id (path): ID do usuário
Request Body:
{
 "name": "João Atualizado",
 "email": "joao_novo@email.com"
}
Resposta 200:
{
 "id": 1,
 "name": "João Atualizado",
 "email": "joao_novo@email.com"
}
Sistema de Usuários, Posts e Comentários 3

5. GET /users/:id/feed
Pontuação: 0,33
Descrição: Retorna todos os posts de um usuário, com os respectivos
comentários em cada post.
Parâmetros:
id (path): ID do usuário
Resposta 200:
[
 {
 "id": 1,
 "title": "Meu primeiro post",
 "content": "Este é o conteúdo do post.",
 "comments": [
 {
 "id": 1,
 "comment": "Muito bom o post!",
 "userId": 2
 }
 ]
 }
]

6. DELETE /users/:id
Pontuação: 0,33
Descrição: Remove um usuário e todos os posts e comentários criados por
ele.
Parâmetros:
id (path): ID do usuário
Resposta 200:
Sistema de Usuários, Posts e Comentários 4
{
 "message": "Usuário e dados relacionados removidos com sucesso"
}
Resposta 404 (se não encontrado):
{
 "error": "Usuário não encontrado"
}

## 🛠 5. Requisitos Funcionais (RF)
1. RF001: O sistema deve permitir listar todos os usuários cadastrados.
2. RF002: O sistema deve permitir a criação de novos posts por usuários
autenticados.
3. RF003: O sistema deve retornar todos os comentários de um post ao acessar
a rota correspondente.
4. RF004: O sistema deve permitir a atualização dos dados de um usuário
específico.
5. RF005: O sistema deve fornecer um "feed" com os posts de um usuário e
seus comentários.
6. RF006: O sistema deve permitir a exclusão de um usuário, removendo
também seus posts e comentários.

## ⚠️ 6. Requisitos Não Funcionais (RNF)
1. RNF001: A API deve seguir os padrões RESTful.
2. RNF002: A API deve retornar respostas em JSON.
3. RNF003: O sistema deve implementar boas práticas de segurança como hash
de senhas.
Sistema de Usuários, Posts e Comentários 5
4. RNF004: A API deve ser implementada utilizando Node.js, Express e
preferencialmente TypeScript.

## ✅ 7. Critérios de Aceitação
Todos os endpoints devem retornar status HTTP adequados (200, 201, 404,
etc.).
A estrutura de resposta deve ser consistente.
Os dados relacionados (posts, comentários) devem ser corretamente
associados aos usuários.
O endpoint de exclusão deve remover as dependências corretamente.
