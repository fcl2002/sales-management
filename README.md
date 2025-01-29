2. Banco de Dados e Modelagem
Tarefas:
Criar o esquema inicial do banco de dados:
Tabelas:
Usuários (users):
ID (PK), nome, email, senha (criptografada), tipo de usuário (admin ou user), timestamps.
Permissões (permissions):
Relacionamento entre usuários e permissões específicas.
Configurar migrações:
Criar scripts de migração para o banco de dados (usando TypeORM ou Prisma).
3. Desenvolvimento do Backend
Tarefas:
Criar o módulo de autenticação:
Criar rotas de login (/auth/login) e logout.
Implementar autenticação usando JWT (JSON Web Tokens).
Configurar middleware para proteger rotas por tipo de usuário.
Criar o módulo de usuários:
Rotas para listar usuários (somente para admin).
Rotas para registrar novos usuários (opcional, no início pode ser feito manualmente via banco de dados).
Configurar controle de permissões:
Criar um guard no NestJS para verificar permissões antes de acessar recursos.
Separar permissões de usuários comuns e administrador.
4. Desenvolvimento do Frontend
Tarefas:
Criar a interface de login:
Tela com campos para email e senha.
Botão de login e mensagem de erro para credenciais inválidas.
Implementar integração com a API de login.
Criar a interface inicial:
Uma tela simples de boas-vindas após o login, com base no tipo de usuário.
Exemplo:
Admin: Acesso a dashboards gerais (placeholder para fases futuras).
Usuário: Acesso ao estoque do ponto de venda (placeholder para fases futuras).
5. Testes e Validação
Tarefas:
Testar a autenticação:
Validar login com credenciais válidas e inválidas.
Garantir que o token JWT está sendo gerado e salvo no front-end (ex.: localStorage ou sessionStorage).
Testar controle de permissões:
Verificar se usuários comuns não conseguem acessar rotas do admin.
Realizar testes unitários e de integração:
Testar APIs de login, logout e listagem de usuários.
6. Documentação
Tarefas:
Documentar as rotas da API criadas na Fase 1:
Exemplo:
POST /auth/login: Autentica um usuário e retorna um token JWT.
GET /users: Lista todos os usuários (somente admin).
Criar instruções básicas de uso para a cliente:
Como realizar login.
Como acessar a interface inicial.
Entrega da Fase 1
Ao final da Fase 1, você terá:

Um sistema funcional para login e autenticação.
Controle de permissões implementado.
Banco de dados configurado e preparado para as próximas fases.
Uma interface inicial simples que valida o login e exibe uma tela baseada no tipo de usuário.
Se precisar de ajuda para implementar uma das tarefas ou mais detalhes sobre qualquer ponto, posso ajudar a detalhar ainda mais!



