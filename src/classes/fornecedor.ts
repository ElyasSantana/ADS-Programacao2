// Interface Fornecedor
export interface InterfaceFornecedor {
  id: number;
  nome: string;
}

// Classe Fornecedor
export class Fornecedor implements InterfaceFornecedor {
  id: number;
  nome: string;
  constructor(id: number, nome: string) {
    this.id = id;
    this.nome = nome;
  }
}
