# API - MovePlus 🚀

> Uma API RESTful para gerenciamento de academias, alunos e exercícios, construída com Node.js e Express.

---

## 🛠 Tecnologias Utilizadas

As principais ferramentas e tecnologias usadas no desenvolvimento:

- [Node.js](https://nodejs.org/) - Ambiente de execução JavaScript
- [Express](https://expressjs.com/) - Framework web
- [MongoDB](https://www.mongodb.com/) - Banco de Dados
- [PostgreSQL](https://www.postgresql.org/) com [Prisma](https://www.prisma.io/) - Banco de Dados
- [Zod](https://zod.dev/) - Validação de dados
- [Swagger](https://swagger.io/) - Documentação da API

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- Gerenciador de pacotes (`npm` ou `yarn`)
- Uma instância de MongoDB e/ou PostgreSQL acessível, de acordo com o banco escolhido em `DB_TYPE`

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clonar o repositório
```bash
git clone [https://github.com/seu-usuario/api-MovePlus-e2.git](https://github.com/seu-usuario/api-MovePlus-e2.git)
cd api-MovePlus-e2
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar as variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e preencha os valores:
```bash
cp .env.example .env
```

A API suporta dois bancos de dados, alternáveis pela variável `DB_TYPE`:
- `DB_TYPE=MONGO` - utiliza a conexão definida em `MONGODB_URI`
- `DB_TYPE=POSTGRES` - utiliza a conexão definida em `DATABASE_URL`

### 4. Preparar o banco de dados (apenas se for usar PostgreSQL)
```bash
npx prisma migrate dev
```

### 5. Rodar o projeto
```bash
npm run dev
```

A API ficará disponível em `http://localhost:3000`, com a documentação Swagger em `http://localhost:3000/docs`.
