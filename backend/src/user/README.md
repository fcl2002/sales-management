Aqui está a estrutura de testes a serem feitas na classe Usuário:

No UserService, temos as seguintes funcionalidades para testar:

Criar usuário (create)

[ ] Valida se o e-mail já existe antes da criação.
[ ] Gera hash de senha corretamente.
[ ] Cria um Shop automaticamente se o usuário for USER.
[ ] Chama corretamente userRepository.create().

Buscar usuários (findAll, findOne, findEmail)

[ ] Retorna a lista de usuários (findAll).
[ ] Retorna um usuário pelo ID (findOne).
[ ] Lança exceção NotFoundException se o ID não existir.
[ ] Retorna um usuário pelo e-mail (findEmail).

Atualizar usuário (update)

[ ] Valida se o usuário existe antes da atualização.
[ ] Valida se o novo e-mail já existe.
[ ] Chama userRepository.update() corretamente.

Remover usuário (remove)

[ ] Verifica se o usuário existe antes de deletar.
[ ] Chama userRepository.remove() corretamente.