// Interface Produto
export interface InterfaceProduto {
  id: number | null;
  nome: string;
  qtdeEstoque: number;
  preco: number;
}

// Classe Produto
export class Produto implements InterfaceProduto {
  id: number | null;
  nome: string;
  qtdeEstoque: number;
  preco: number;

  constructor(
    nome: string = '',
    qtdeEstoque: number = 0,
    preco: number = 0.0,
    id: number | null = null
  ) {
    this.nome = nome;
    this.qtdeEstoque = qtdeEstoque;
    this.preco = preco;
    this.id = id;
  }
}
