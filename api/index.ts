import { InterfaceProduto } from './models/produto';

// INTRODUÇÃO-2 AO EXPRESS - WEB API
import express, { Express, Request, Response } from 'express';
const app: Express = express();
const port = 3000;

// O express.json() é um middleware do express que converte
// o body (corpo, req.body) de requisições POST ou PUT no
// formato JSON a ser tratado pela API.
app.use(express.json());

// Criação do array que simula uma coleção "produtos"
// de um banco de dados NoSQL (orientado a documentos)
let produtos: Array<InterfaceProduto> = [
  { id: 1, nome: 'Tijolo', qtdeEstoque: 1000, preco: 0.9 },
  { id: 2, nome: 'Cimento', qtdeEstoque: 200, preco: 25.0 },
];

// Classe Produto
class Produto implements InterfaceProduto {
  id: number;
  nome: string;
  qtdeEstoque: number;
  preco: number;

  constructor(id: number, nome: string, qtdeEstoque: number, preco: number) {
    this.id = id;
    this.nome = nome;
    this.qtdeEstoque = qtdeEstoque;
    this.preco = preco;
  }
}

/* ROTAS DA API - MÉTODOS GET, POST, PUT, DELETE */
// Rota raiz
app.get('/', (req: Request, res: Response, next): any => {
  res.json({
    apiName: 'Catálogo de Produtos!',
    greetingMessage: 'Bem-Vindo!',
  });
});

/* Rotas do CRUD de Produtos */
// CREATE - Criar um novo produto
app.post('/produtos', (req: Request, res: Response, next) => {
  try {
    if (req.body.nome) {
      const { nome, qtdeEstoque, preco } = req.body; //Desestruturação

      const id: number =
        produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
      // Instanciando objeto da classe Produto
      const novoProduto: InterfaceProduto = new Produto(
        id,
        nome,
        qtdeEstoque,
        preco
      );
      // Adicionando o objeto instanciado no final do vetor produtos
      produtos.push(novoProduto);
      res.json({ message: 'Produto cadastrado com sucesso!' });
    } else {
      res.json({
        message: 'Dados incorretos. NÃO FOI POSSÍVEL cadastrar o produto!',
      });
    }
  } catch (error) {
    res.status(400).json({ erro: `${error}` });
  }
});

// READ ALL - Consultar/Listar todos os produtos
app.get('/produtos', (req: Request, res: Response, next) => {
  res.json(produtos);
});

// READ - Consultar detalhe do produto
app.get('/produtos/:id', (req: Request, res: Response, next) => {
  try {
    if (req.params.id) {
      const id: number = parseInt(req.params.id);
      // O método find() retorna o primeiro valor do array, se
      // um elemento do array atender à função de teste fornecida.
      // Caso contrário, retorna undefined.
      const produto = produtos.find((elemento) => elemento.id === id);
      if (produto) {
        res.json(produto);
      } else {
        res.json({ message: 'Produto não encontrado!' });
      }
    }
  } catch (error) {
    res.status(400).json({ erro: `${error}` });
  }
});

// UPDATE - Alterar produto
app.put('/produtos/:id', (req: Request, res: Response, next) => {
  try {
    if (req.params.id) {
      const id: number = parseInt(req.params.id);
      const { nome, qtdeEstoque, preco } = req.body; //Desestruturação
      // O método find() retorna o primeiro valor do array, se
      // um elemento do array atender à função de teste fornecida.
      // Caso contrário, retorna undefined.
      const produto = produtos.find((elemento) => elemento.id === id);
      //const novoProduto = {...produto,nome,qtdeEstoque,preco}
      if (produto) {
        produto.nome = nome;
        produto.qtdeEstoque = qtdeEstoque;
        produto.preco = preco;
        res.json({ message: 'Produto alterado com sucesso!' });
      } else {
        res.json({ message: 'Produto não encontrado!' });
      }
    }
  } catch (error) {
    res.status(400).json({ erro: `${error}` });
  }
});

// DELETE - Excluir produto
app.delete('/produtos/:id', (req: Request, res: Response, next) => {
  try {
    if (req.params.id) {
      if (req.params.id) {
        const id: number = parseInt(req.params.id);
        // O método filter() gera um novo array apenas com os elementos
        // que satisfazem à função de teste fornecida
        // Atualizando o vetor produtos (excluindo no produto solicitado)
        produtos = produtos.filter((elemento) => elemento.id !== id);
        console.log('produtos: ', JSON.stringify(produtos));
        res.json({ message: 'Produto excluído com sucesso!' });
      } else {
        res.json({
          message: 'Dados incorretos. NÃO FOI POSSÍVEL excluir o produto!',
        });
      }
    }
  } catch (error) {
    res.status(400).json({ erro: `${error}` });
  }
});

app.listen(port, () =>
  console.log(`API "Catálogo de Produtos" rodando na porta ${port}`)
);
