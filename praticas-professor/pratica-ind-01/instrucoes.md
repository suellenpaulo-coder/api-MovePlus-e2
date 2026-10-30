# Desafio A: Cadastrar Novo Jogo POST /jogos
Implemente a rota POST /jogos para inserir um novo jogo no array jogos :
Extraia a propriedade nome enviada no corpo da requisição ( req.body ).
Gere um objeto contendo o novo id e o nome informado.
Adicione o novo objeto ao array jogos utilizando o método .push() .
Retorne o objeto cadastrado com o código de status HTTP 201 Created .


# Desafio B: Editar Jogo Existente PUT /jogos/:id
Implemente a rota PUT /jogos/:id para atualizar o nome de um jogo cadastrado:
Capturar o parâmetro dinâmico da URL ( req.params.id ) e converta com Number() .
Localize o índice do jogo no array utilizando jogos.findIndex() .
Se o registro existir, atualize a propriedade nome com o valor vindo do req.body .
Retorne o objeto atualizado com o status 200 OK (ou 404 Not Found caso não exista).

# 🧪 Roteiro de Teste (Postman ou Thunder Client)
Para testar o POST: Envie um POST http://localhost:3000/jogos selecionando a aba Body > raw > JSON com
a estrutura: { "nome": "Super Mario" } .
Para testar o PUT: Envie um PUT http://localhost:3000/jogos/2 com o corpo JSON: { "nome": "EA
Sports FC 24" } e em seguida faça um GET /jogos para confirmar a alteração.