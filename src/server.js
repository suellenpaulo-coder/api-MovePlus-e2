import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

  const porta = process.env.PORT;

  app.listen(porta, () => {
      console.log(`Servidor rodando na porta ${porta}`)
  });