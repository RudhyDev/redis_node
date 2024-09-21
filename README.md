# 🚀 Projeto Redis Node

Este é um projeto de exemplo que utiliza o framework NestJS para criar uma API RESTful que se conecta a um banco de dados MongoDB e utiliza o Redis como cache.

## 📖 Descrição

Este projeto é um exemplo de como utilizar o NestJS para criar uma API RESTful que se conecta a um banco de dados MongoDB e utiliza o Redis como cache. O projeto inclui um health check que verifica a saúde do MongoDB.

## ✅ Pré-requisitos

- 🟢 Docker
- 🟢 Docker Compose

## ⚙️ Instalação

1. Clone o repositório: `git clone https://github.com/seu-usuario/projeto-redis-node.git`
2. Navegue até o diretório do projeto: `cd projeto-redis-node`
3. Inicie os containers Docker: `docker-compose up --build`

## 🚀 Utilização

A API RESTful estará disponível em `http://localhost:3000`. Você pode utilizar ferramentas como o Postman ou o cURL para testar as rotas.

## 📚 Rotas

- `GET /`: Retorna um health check que verifica a saúde do MongoDB e do Redis
- `GET /users`: Retorna uma lista de usuários
- `POST /users`: Cria um novo usuário
- `GET /users/:id`: Retorna um usuário por ID
- `PUT /users/:id`: Atualiza um usuário
- `DELETE /users/:id`: Deleta um usuário

## 🩺 Health Check

O health check é realizado utilizando o pacote `@nestjs/terminus`. Ele verifica a saúde do MongoDB e do Redis e retorna um status de saúde.

## 🗃️ Cache

O cache é realizado utilizando o Redis. Ele armazena os resultados das consultas ao MongoDB para evitar consultas desnecessárias.

## 🐳 Docker

O projeto está dockerizado e utiliza o Docker Compose para gerenciar os serviços. O arquivo `docker-compose.yml` define três serviços:

- `mongo`: Banco de dados MongoDB
- `redis`: Servidor Redis
- `app`: Aplicação Node.js utilizando NestJS

### Comandos Docker

- Para iniciar os serviços: `docker-compose up --build`
- Para parar os serviços: `docker-compose down`

## 📄 Licença

Este projeto é licenciado sob a licença MIT.

## 👤 Autor

Ruhy Maycon Pereira da Costa

## 🙏 Agradecimentos

Agradeço à equipe do NestJS por criar um framework tão incrível!

## 🤝 Contribuição

Este projeto é open-source e você pode contribuir com ele. Para contribuir, basta enviar um pull request com suas alterações.
