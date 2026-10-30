
const express = require('express');

const app = express();
const PORT = 3000;

// Rota inicial do projeto Move Plus
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'Bem-vindo à Move Plus!',
    descricao: 'Sua academia, seus objetivos.',
    status: 'Servidor funcionando'
  });
});

// Rota GET /livros
app.get('/livros', (req, res) => {
  const livros = [
    {
      id: 1,
      titulo: 'Hábitos Atômicos',
      autor: 'James Clear'
    },
    {
      id: 2,
      titulo: 'O Poder do Hábito',
      autor: 'Charles Duhigg'
    },
    {
      id: 3,
      titulo: 'Mindset',
      autor: 'Carol S. Dweck'
    }
  ];

  res.status(200).json(livros);
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Move Plus rodando em http://localhost:${PORT}`);
});
