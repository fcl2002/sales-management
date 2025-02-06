# Documentação do Backend

## 📌 Requisitos Funcionais

### 🔹 **Autenticação e Controle de Acesso**
- [X] **RF01:** O sistema deve permitir o cadastro, leitura, atualização e exclusão (CRUD) de usuários.
- [X] **RF02:** O sistema deve permitir a autenticação de usuários.
- [X] **RF03:** O sistema deve diferenciar permissões entre usuários comuns e administradores.
- [X] **RF04:** O sistema deve proteger rotas, garantindo que usuários sem credenciais válidas não acessem recursos restritos.

### 🔹 **Gestão de Produtos e Integração**
- [ ] **RF05:** O sistema deve permitir o cadastro, leitura, atualização e exclusão (CRUD) de produtos.
- [ ] **RF06:** O sistema deve permitir a criação, leitura, atualização e exclusão (CRUD) de pontos de venda, vinculando-os a usuários específicos.
- [ ] **RF07:** O sistema deve permitir a integração com uma API externa para importar e replicar a tabela de produtos no banco de dados, garantindo que as informações estejam sempre atualizadas.

### 🔹 **Gestão de Vendas e Estoques**
- [ ] **RF08:** O sistema deve possibilitar o registro de vendas, atualizando automaticamente o estoque.
- [ ] **RF09:** O sistema deve permitir que o administrador visualize os estoques de todos os pontos de venda.
- [ ] **RF10:** O sistema deve limitar o acesso do usuário ao estoque do seu próprio ponto de venda.
- [ ] **RF11:** O sistema deve atualizar os estoques em tempo real após cada venda.

### 🔹 **Relatórios e Interface**
- [ ] **RF12:** O sistema deve gerar um histórico de vendas detalhado para cada ponto de venda, permitindo consultas e análises posteriores.
- [ ] **RF13:** O sistema deve ter uma interface intuitiva e fácil de usar.

## 📌 Requisitos Não Funcionais

- [x] RNF01: O sistema deve utilizar JWT (JSON Web Token) para autenticação, garantindo um mecanismo seguro e escalável de controle de acesso.
- [X] RNF02: O JWT deve conter informações essenciais, como ID do usuário, cargo (role) e data de expiração, e deve ser assinado com uma chave secreta para evitar falsificações.
- [x] RNF03: O sistema deve exigir um token válido para acessar rotas protegidas, retornando erro 401 (Unauthorized) em caso de credenciais inválidas ou expiradas.
- [x] RNF04: O tempo de expiração do JWT deve ser configurável, permitindo ajustes conforme as necessidades de segurança da aplicação.
- [ ] RNF05: O sistema deve suportar refresh tokens, permitindo que usuários renovem sua autenticação sem precisar fazer login novamente com frequência excessiva.

## 📌 Interfaces do Usuário

1. Tela de Login
- [ ] Autenticação de usuários.
- [ ] Opção de recuperação de senha.

2. Dashboard do Usuário
- [ ] Resumo das vendas realizadas no mês.

3. Tela de Gerenciamento de Produtos (CRUD)
- [ ] Interface para criar, editar, excluir e visualizar produtos cadastrados.
- [ ] Opção de filtros e barra de pesquisa para facilitar a navegação.

4. Tela de Registro de Vendas
- [ ] Seleção de produtos e quantidade vendidos.
- [ ] Botão para confirmar a venda e atualizar o estoque.

5. Tela de Extrato Mensal de Vendas
- [ ] Visualização de todas as vendas realizadas durante o mês.
- [ ] Opção de exportar o extrato em formatos como PDF ou Excel.

6. Tela de Estoque do Usuário
- [ ] Exibição do estoque atual do ponto de venda.
- [ ] Destaque para produtos com estoque baixo.

---

# 📌 Interfaces do Administrador

1. Dashboard do Administrador
- [ ] Resumo geral dos estoques e vendas de todos os pontos de venda.
- [ ] Gráficos e métricas consolidadas (ex.: produtos mais vendidos, pontos de venda com maior volume de vendas).

2. Tela de Gerenciamento de Usuários (CRUD)
- [ ] Criação, edição, exclusão e listagem de usuários e seus pontos de venda.
- [ ] Controle de permissões e visualização de status dos usuários.

3. Tela de Estoque Global
- [ ] Exibição consolidada dos estoques de todos os pontos de venda.
- [ ] Opção de filtrar e buscar por ponto de venda ou produto específico.

4. Tela de Relatórios e Extratos
- [ ] Geração de relatórios detalhados de vendas e estoques por ponto de venda.
- [ ] Configuração de períodos personalizados para relatórios.

---

# 📌 Interfaces Gerais

1. Tela de Configurações do Perfil
- [ ] Alteração de dados pessoais, senha e preferências.

---

## 🚀 Tecnologias Utilizadas

O backend foi desenvolvido utilizando as seguintes tecnologias:
- **NestJS** - Framework para construção de APIs robustas e escaláveis.
- **Node.js** - Ambiente de execução para JavaScript no backend.
- **Prisma** - ORM para gerenciamento eficiente do banco de dados.
- **PostgreSQL** - Banco de dados relacional utilizado na aplicação.

## 📂 Estrutura do Projeto

```
📦 backend
 ┣ 📂 src
 ┃ ┣ 📂 auth     (Autenticação e controle de usuários)
 ┃ ┣ 📂 products (Gerenciamento de produtos)
 ┃ ┣ 📂 sales    (Registro e controle de vendas)
 ┃ ┣ 📂 reports  (Geração de relatórios)
 ┃ ┣ 📜 main.ts  (Arquivo de inicialização do NestJS)
 ┃ ┣ 📜 app.module.ts (Módulo raiz do aplicativo)
 ┗ 📂 prisma
 ┃ ┣ 📜 schema.prisma (Configuração do banco de dados)
 ┃ ┣ 📜 migrations/ (Histórico de migrações do banco)
 ┗ 📜 .env (Variáveis de ambiente)
```

## ⚙️ Configuração do Ambiente (Backend)

```bash
# NestJS CLI e criação do projeto
$ npm install @nestjs/cli
$ nest new project-name

# Prisma
$ npm install prisma --save-dev
$ npx prisma init
$ npm install @prisma/client
$ npx prisma migrate dev --name init
$ npx prisma generate

# Dependências para autenticação com JWT e Passport
$ npm i @nestjs/jwt @nestjs/passport passport-jwt bcrypt passport-local
$ npm i -D @types/passport-jwt @types/passport-local

# Biblioteca para validação
$ npm i class-validator class-transformer

# Pacote de configuração do NestJS
$ npm i @nestjs/config

# Extras
## Gerar hash com bcrypt
$ npm install -g bcrypt-cli
$ bcrypt-cli hash minhaSenha123

## Gerar chave de 32 bits
$ openssl rand -hex 32

```
### 1️⃣ Instalar Dependências
```bash
npm install
```
### 2️⃣ Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e adicione as configurações do banco de dados:
```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=chave_secreta
JWT_EXPIRES_IN=1h
PORT=3000
```

### 3️⃣ Rodar Migrações do Banco
```bash
npx prisma migrate dev
```

### 4️⃣ Iniciar o Servidor
```bash
npm run start
```

## 🔍 Endpoints da API

| Método  | Rota                     | Descrição                                  |
|---------|--------------------------|--------------------------------------------|
| `POST`  | `/users`              | Criar um novo usuário                     |
| `GET`   | `/users`              | Listar todos os usuários                  |
| `GET`   | `/users/me`              | Rota para o usuário buscar detalhes de seu próprio perfil específico                  |
| `GET`   | `/users/:id`              | Buscar detalhes de um usuário específico                  |
| `PATCH`   | `/users/:id`          | Atualizar um usuário                      |
| `DELETE`| `/users/:id`          | Deletar um produto                        |
| `POST`  | `/auth/login`            | Autenticação de usuários cadastrados                   |
| `POST`  | `/auth/forgot-password`            | Rota para o usuário redefinir a senha                   |
| `PATCH`  | `/auth/change-password`            | Rota para o usuário alterar a senha                   |

## 🛠️ Deploy na DigitalOcean

Para subir a aplicação na DigitalOcean, siga os seguintes passos:

### 1️⃣ Criar um Droplet e Configurar Banco de Dados
- Configurar PostgreSQL no servidor.
- Criar um banco de dados e atualizar a variável `DATABASE_URL`.

### 2️⃣ Subir a Aplicação no Servidor
```bash
git clone https://github.com/seu-repositorio.git
cd backend
npm install
npx prisma migrate deploy
npm run start:prod
```

### 3️⃣ Configurar PM2 para Gerenciar a Aplicação
```bash
npm install -g pm2
pm2 start dist/main.js --name backend
pm2 save
pm2 startup
```

Agora o backend estará rodando em produção! 🚀
