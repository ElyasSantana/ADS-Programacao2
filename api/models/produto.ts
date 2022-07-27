export interface InterfaceProduto {
  id: number;
  nome: string;
  qtdeEstoque: number;
  preco: number;
}

// Classe Produto
export class Produto implements InterfaceProduto {
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
