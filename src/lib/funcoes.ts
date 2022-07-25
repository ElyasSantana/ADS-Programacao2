// Importação de pacote para entrada de dados
import input from 'readline-sync';
// Importação do cliente HTTP AXIOS
import axios from 'axios';
// Importação das classes (Embora Fornecedor não será usada)
import { InterfaceProduto, Produto } from '../classes/produto';
import { InterfaceFornecedor } from '../classes/fornecedor';

//FUNÇÕES CRUD para consumo da API
async function listarFornecedores() {
  // Lista fornecedores cadastrados
  console.log('------------------------------');
  console.log(' FORNECEDORES');
  console.log('------------------------------');
  console.log('ID NOME');
  console.log('------------------------------');
  try {
    await axios
      .get('http://localhost:3000/fornecedores')
      .then((result: any) => {
        result.data.forEach((element: InterfaceFornecedor) =>
          console.log(element.id + '- ' + element.nome)
        );
      });
    console.log('------------------------------');
  } catch (error) {
    console.log('ERRO: ' + error);
  }
}

async function listarProdutosComFornecedores() {
  // Lista fornecedores cadastrados
  console.log('--------------------------------------------');
  console.log(' PRODUTOS COM FORNECEDORES');
  console.log('--------------------------------------------');
  console.log(' PRODUTO');
  console.log('ID - NOME (NOME FORNECEDOR)');
  console.log('--------------------------------------------');
  await Promise.all([
    axios.get('http://localhost:3000/produtos'),
    axios.get('http://localhost:3000/fornecedores'),
  ])
    .then((results) => {
      const produtos = results[0].data; // Array de produtos
      const fornecedores = results[1].data; // Array de fornecedores
      //const fornecedor = fornecedores.find(elemento => elemento.id === id);
      let produtosComFornecedor = results[0].data.map(
        (elemProduto: InterfaceProduto) => ({
          id: elemProduto.id,
          nome: elemProduto.nome,
          qtdeEstoque: elemProduto.qtdeEstoque,
          preco: elemProduto.preco,
          nomeForn: fornecedores.find(
            (elemForn: InterfaceFornecedor) => elemForn.id === elemProduto.id
          ).nome,
        })
      );
      produtosComFornecedor.forEach((elemento: any) => {
        console.log(`${elemento.id} - ${elemento.nome} (${elemento.nomeForn})`);
      });
      console.log('--------------------------------------------');
    })
    .catch((error) => console.log('ERRO: ' + error));
}

async function adicionarProduto() {
  const produto: InterfaceProduto = new Produto();
  produto.nome = input.question('Digite o nome do produto: ');
  produto.qtdeEstoque = parseInt(
    input.question('Digite a quantidade em estoque: ')
  );
  produto.preco = parseFloat(input.question('Digite o preço: '));
  try {
    // Lista fornecedores para obter o id do fornecedor que fornece o produto
    // que está sendo cadastrado
    await axios.get('http://localhost:3000/fornecedores').then((result) => {
      const vetFornecedores: Array<any> = result.data.map(
        (elemForn: any) => elemForn.nome
      );
      console.log('Selecione abaixo o fornecedor para o produto:');
      const opcao = input.keyInSelect(vetFornecedores, 'Digite a opção: ', {
        cancel: 'null',
      });
      // CANCEL = -1

      produto.id = opcao >= 0 ? opcao + 1 : null;
      console.log(
        `Fornecedor selecionado: ${produto.id}${
          produto.id ? '-' + vetFornecedores[produto.id - 1] : ''
        }`
      );
    });
    // Cadastra o produto
    await axios
      .post('http://localhost:3000/produtos', produto)
      .then((result) => console.log(result.data.message));
  } catch (error) {
    console.log('ERRO: ' + error);
  }
}

async function listarEditarProdutos() {
  // Lista produtos cadastrados
  console.log('Selecione abaixo o produto para Alterar/Excluir:');
  try {
    let opcao: number = 0,
      produtoId: number | null = null,
      produto: any;
    await axios.get('http://localhost:3000/produtos').then((result: any) => {
      const vetProdutos: any = result.data.map(
        (produto: InterfaceProduto) => `-> ${produto.id} - ${produto.nome}`
      );

      console.log('----------------------------------');
      console.log(' PRODUTOS');
      console.log('----------------------------------');
      console.log('[ ] ID NOME');
      console.log('----------------------------------');
      opcao = input.keyInSelect(vetProdutos, 'Digite a opção: ', {
        cancel: 'Sair',
      }); // CANCEL = -1

      produtoId = opcao >= 0 ? opcao + 1 : null;
      //console.clear();
    });
    if (opcao !== -1) {
      // -1 -> Sair
      console.clear();
      await axios
        .get(`http://localhost:3000/produtos/${produtoId}`)
        .then((result: any) => {
          produto = result.data;
          console.log('-----------------------------------');
          console.log(' DETALHE DO PRODUTO');
          console.log('-----------------------------------');
          console.log(`ID: ${result.data.id}`);
          console.log(`NOME: ${result.data.nome}`);
          console.log(
            `QTDE: ${result.data.qtdeEstoque} PREÇO: ${result.data.preco} ID_FORN: ${result.data.id}`
          );

          console.log('-----------------------------------');
        });
      opcao = input.keyInSelect(['Alterar', 'Excluir'], 'Digite a opção: ', {
        cancel: 'Sair',
      });
      // CANCEL = -1

      switch (opcao) {
        case 0: // Alterar
          produto.nome = input.question('NOME: ');
          produto.qtdeEstoque = parseInt(input.question('QTDE ESTOQUE: '));
          produto.preco = parseFloat(input.question('PREÇO: '));
          produto.id = parseInt(input.question('ID FORNECEDOR: '));
          await axios
            .put(
              `http://localhost:3000/produtos/${produto.id}`,

              produto
            )
            .then((result) => console.log(result.data.message));

          break;
        case 1: // Excluir
          const excluir = input.keyInYN(
            `Deseja excluir o produto "${produto.id}-${produto.nome}" (y=sim / n=não)?`
          );

          if (excluir)
            await axios
              .delete(`http://localhost:3000/produtos/${produto.id}`)
              .then((result) => console.log(result.data.message));

          break;
        case -1:
          console.log('Operação de "Alteração/Exclusão" CANCELADA!');
          break;
      }
    } else {
      console.log('Operação de "Alteração/Exclusão" CANCELADA!');
    }
  } catch (error) {
    console.log('ERRO: ' + error);
  }
}

export {
  listarFornecedores,
  listarProdutosComFornecedores,
  adicionarProduto,
  listarEditarProdutos,
};
