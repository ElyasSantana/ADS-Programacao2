import { InterfaceFornecedor, Fornecedor } from '../models/fornecedor';

import { Router, Request, Response } from 'express';

const router = Router();

let fornecedores: Array<InterfaceFornecedor> = [
  { id: 1, nome: 'Votorantim' },
  { id: 2, nome: 'ADC Material de Construcão' },
];

/* Rotas do CRUD de fornecedores */
// CREATE - Criar um novo fornecedor
router.post('/fornecedores', (req: Request, res: Response, next) => {
  try {
    if (req.body.nome) {
      const { nome } = req.body; //Desestruturação

      const id: number =
        fornecedores.length > 0
          ? fornecedores[fornecedores.length - 1].id + 1
          : 1;
      // Instanciando objeto da classe fornecedor
      const novofornecedor: InterfaceFornecedor = new Fornecedor(id, nome);
      // Adicionando o objeto instanciado no final do vetor fornecedores
      fornecedores.push(novofornecedor);
      res.json({ message: 'fornecedor cadastrado com sucesso!' });
    } else {
      res.json({
        message: 'Dados incorretos. NÃO FOI POSSÍVEL cadastrar o fornecedor!',
      });
    }
  } catch (error) {
    res.status(400).json({ erro: `${error}` });
  }
});

// READ ALL - Consultar/Listar todos os fornecedores
router.get('/fornecedores', (req: Request, res: Response, next) => {
  res.json(fornecedores);
});

// READ - Consultar detalhe do fornecedor
router.get('/fornecedores/:id', (req: Request, res: Response, next) => {
  try {
    if (req.params.id) {
      const id: number = parseInt(req.params.id);
      // O método find() retorna o primeiro valor do array, se
      // um elemento do array atender à função de teste fornecida.
      // Caso contrário, retorna undefined.
      const fornecedor = fornecedores.find((elemento) => elemento.id === id);
      if (fornecedor) {
        res.json(fornecedor);
      } else {
        res.json({ message: 'fornecedor não encontrado!' });
      }
    }
  } catch (error) {
    res.status(400).json({ erro: `${error}` });
  }
});

// UPDATE - Alterar fornecedor
router.put('/fornecedores/:id', (req: Request, res: Response, next) => {
  try {
    if (req.params.id) {
      const id: number = parseInt(req.params.id);
      const { nome } = req.body; //Desestruturação
      // O método find() retorna o primeiro valor do array, se
      // um elemento do array atender à função de teste fornecida.
      // Caso contrário, retorna undefined.
      const fornecedor = fornecedores.find((elemento) => elemento.id === id);
      //const novofornecedor = {...fornecedor,nome,qtdeEstoque,preco}
      if (fornecedor) {
        fornecedor.nome = nome;
        res.json({ message: 'Fornecedor alterado com sucesso!' });
      } else {
        res.json({ message: 'Fornecedor não encontrado!' });
      }
    }
  } catch (error) {
    res.status(400).json({ erro: `${error}` });
  }
});

// DELETE - Excluir fornecedor
router.delete('/fornecedores/:id', (req: Request, res: Response, next) => {
  try {
    if (req.params.id) {
      if (req.params.id) {
        const id: number = parseInt(req.params.id);
        // O método filter() gera um novo array apenas com os elementos
        // que satisfazem à função de teste fornecida
        // Atualizando o vetor fornecedores (excluindo no fornecedor solicitado)
        fornecedores = fornecedores.filter((elemento) => elemento.id !== id);
        console.log('Fornecedores: ', JSON.stringify(fornecedores));
        res.json({ message: 'fornecedor excluído com sucesso!' });
      } else {
        res.json({
          message: 'Dados incorretos. NÃO FOI POSSÍVEL excluir o fornecedor!',
        });
      }
    }
  } catch (error) {
    res.status(400).json({ erro: `${error}` });
  }
});

export default router;
