// Importação de pacote para entrada de dados
import input from 'readline-sync';
// Importação das Funções CRUD
import {
  listarFornecedores,
  listarProdutosComFornecedores,
  adicionarProduto,
  listarEditarProdutos,
} from './lib/funcoes';

/* HOME CONTROLLER */
// OPÇÕES DO MENU
const opcoesMenu = [
  'Listar Fornecedores',
  'Listar Produtos com Fornecedores',
  'Cadastrar Produto',
  'Listar/Editar Produtos',
];

// FUNÇÃO MAIN
async function main() {
  let sair: boolean | string = false;
  while (!sair) {
    console.clear();
    console.log('---------------------------------------');
    console.log(' BEM VIDO AO CONTROLE DE ESTOQUE ');
    console.log(' MENU DE OPÇÕES ');
    console.log('---------------------------------------');
    const opcao = input.keyInSelect(opcoesMenu, 'Digite a opção: ', {
      cancel: 'Sair',
    });

    switch (opcao) {
      case 0:
        console.clear();
        await listarFornecedores();
        input.question('...Pressione alguma tecla para continuar');
        break;
      case 1:
        console.clear();
        await listarProdutosComFornecedores();
        input.question('...Pressione alguma tecla para continuar');
        break;
      case 2:
        console.clear();
        await adicionarProduto();
        input.question('...Pressione alguma tecla para continuar');
        break;
      case 3:
        console.clear();
        await listarEditarProdutos();
        input.question('...Pressione alguma tecla para continuar');
        break;
      case -1:
        sair = input.keyInYN('Deseja sair da aplicação (y=sim / n=não)?');
      //if (sair)
      // process.exit(0); // Finaliza o processo do Node com 0=êxito
    }
  }
}
// EXECUÇÃO DO APLICATIVO
main();
