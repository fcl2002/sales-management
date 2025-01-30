# Requisitos Funcionais do Sistema

## 📌 Fase 1: Módulo de Autenticação e Configuração Inicial
- [ ] O sistema deve permitir o cadastro, a leitura, a atualizaçã criação de usuários
- [ ] Criar tela de login e autenticação de usuários
- [x] Diferenciação entre admin e usuário comum
- [x] Estruturar o banco de dados inicial
- [x] Implementar controle de permissões (admin e usuário comum)

## 📌 Fase 2: Cadastro de Produtos e Estoque
- [ ] Criar CRUD de produtos (criação, edição, visualização e exclusão)
- [ ] Implementar controle de estoque básico
- [ ] Permitir visualização e edição manual do estoque pelo admin
- [ ] Puxar dados de uma API externa e replicar a tabela de produtos no banco de dados

## 📌 Fase 3: Registro de Vendas e Atualização de Estoque
- [ ] Implementar registro de vendas por usuários
- [ ] Atualizar estoque automaticamente após venda
- [ ] Exibir estoque em tempo real para pontos de venda e admin

## 📌 Fase 4: Relatórios e Extratos
- [ ] Criar geração de extratos mensais por ponto de venda
- [ ] Desenvolver relatórios detalhados de vendas para o admin

## 📌 Fase 5: Ajustes Finais e Testes
- [ ] Realizar testes finais do sistema
- [ ] Corrigir bugs e refinar interface
- [ ] Criar documentação completa do sistema

## 📌 Fase 6: Implantação na DigitalOcean
- [ ] Configurar ambiente de produção na DigitalOcean
- [ ] Configurar banco de dados na nuvem
- [ ] Implementar CI/CD para deploy automatizado
- [ ] Testar a aplicação em ambiente de produção
- [ ] Garantir segurança e escalabilidade do sistema

---

# 📌 Telas para Usuários (Pontos de Venda)

## 📌 Tela de Login
- [ ] Autenticação de usuários com diferenciação de permissões (usuário comum ou admin)
- [ ] Opção de recuperação de senha (opcional)

## 📌 Dashboard do Usuário
- [ ] Resumo das vendas realizadas no mês
- [ ] Exibição de notificações (ex.: alerta de estoque baixo)

## 📌 Tela de Cadastro e Gerenciamento de Produtos (CRUD)
- [ ] Interface para criar, editar, excluir e visualizar produtos cadastrados
- [ ] Filtros e barra de pesquisa para facilitar a navegação

## 📌 Tela de Registro de Vendas
- [ ] Seleção de produtos e quantidade vendidos
- [ ] Botão para confirmar a venda e atualizar o estoque em tempo real

## 📌 Tela de Extrato Mensal de Vendas
- [ ] Visualização de todas as vendas realizadas durante o mês
- [ ] Opção de exportar o extrato em formatos como PDF ou Excel

## 📌 Tela de Estoque do Usuário
- [ ] Exibição do estoque atual do ponto de venda
- [ ] Destaque para produtos com estoque baixo

---

# 📌 Telas para Administrador

## 📌 Dashboard do Administrador
- [ ] Resumo geral dos estoques e vendas de todos os pontos de venda
- [ ] Gráficos e métricas consolidadas (ex.: produtos mais vendidos, pontos de venda com maior volume de vendas)

## 📌 Tela de Gerenciamento de Usuários (CRUD)
- [ ] Criação, edição, exclusão e listagem de usuários e seus pontos de venda
- [ ] Controle de permissões e visualização de status dos usuários

## 📌 Tela de Estoque Global
- [ ] Exibição consolidada dos estoques de todos os pontos de venda
- [ ] Opção de filtrar e buscar por ponto de venda ou produto específico

## 📌 Tela de Relatórios e Extratos
- [ ] Geração de relatórios detalhados de vendas e estoques por ponto de venda
- [ ] Configuração de períodos personalizados para relatórios

---

# 📌 Telas Gerais (Comuns a Ambos)

## 📌 Tela de Configurações do Perfil
- [ ] Alteração de dados pessoais, senha e preferências

# 📌 Documentação do Backend

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
$ npm i @nestjs/jwt @nestjs/passport passport-jwt bcrypt
$ npm i -D @types/passport-jwt

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
| `POST`  | `/auth/login`            | Autenticação do usuário                   |
| `POST`  | `/auth/register`         | Cadastro de novo usuário                  |
| `GET`   | `/products`              | Listar todos os produtos                  |
| `POST`  | `/products`              | Criar um novo produto                     |
| `PUT`   | `/products/:id`          | Atualizar um produto                      |
| `DELETE`| `/products/:id`          | Deletar um produto                        |
| `POST`  | `/sales`                 | Registrar uma venda                       |
| `GET`   | `/reports/sales`         | Gerar relatório de vendas                 |

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
