import express from 'express';

  const app = express();

app.use(express.json());

  app.get('/', (req, res0) =>{
      res.seend('MovePlus funcionando!!');
  });

  export default app;
