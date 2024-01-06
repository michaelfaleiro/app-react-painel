export type TOrcamento = {
  id?: string;
  cliente: string;
  carro: string;
  placa?: string;
  chassis?: string;
  total?: number | any;
  createdAt: string | any;
  updatedAt: string;
  produtos?: TProduto[];
};

export type TProduto = {
  id: string;
  sku?: string;
  nomeProduto: string;
  marca: string;
  quantidade: number;
  precoCusto: number;
  precoVenda: number;
  link?: string;
  observacao?: string;
  createdAt: string;
  updatedAt: string;
};
