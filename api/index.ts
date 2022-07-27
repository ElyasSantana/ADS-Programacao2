// INTRODUÇÃO-2 AO EXPRESS - WEB API
import express, { Express } from 'express';
import produtoRotas from './routes/produto';
import fornecedorRotas from './routes/fornecedor';

const app: Express = express();
const port = 3000;

app.use(express.json());

app.use(produtoRotas);
app.use(fornecedorRotas);

app.listen(port, () =>
  console.log(`API "Catálogo de Produtos" rodando na porta ${port}`)
);
