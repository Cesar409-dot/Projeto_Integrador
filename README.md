# 🎬 CesarFlix

Projeto integrador desenvolvido para as disciplinas de **Front-end** e **Back-end**, com o tema de **Cinema**.

A aplicação permite cadastrar, visualizar e excluir filmes, utilizando um Front-end em React integrado a uma API REST desenvolvida em Java.

## 🛠️ Tecnologias utilizadas

### Front-end
- React
- JavaScript
- JSX
- React Router
- CSS Modules
- Vite

### Back-end
- Java
- Spring Boot
- JdbcTemplate
- Banco de dados H2

## 💻 Funcionalidades

- Cadastro de filmes;
- Listagem de filmes cadastrados;
- Exclusão de filmes;
- Atualização da lista de filmes;
- Validação dos dados;
- Comunicação entre Front-end e Back-end através de uma API REST.

## 🔌 Endpoints

| Método | Endpoint | Função |
|---|---|---|
| GET | `/filmes` | Lista os filmes |
| POST | `/filmes` | Cadastra um filme |
| PUT | `/filmes/{id}` | Edita um filme |
| DELETE | `/filmes/{id}` | Exclui um filme |

## ▶️ Como executar

### Back-end

Entre na pasta do Back-end e execute o projeto Spring Boot pela IDE.

A API estará disponível em:

`http://localhost:8080`

### Front-end

Entre na pasta do Front-end e execute:

```bash
npm install
npm run dev
