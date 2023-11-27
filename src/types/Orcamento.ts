export type TOrcamento = {
  id?: string;
  cliente: string;
  veiculo: string;
  placa?: string;
  chassi?: string;
  dataCriacao: string;
  produtos?: TProduto[];
};

export type TProduto = {
  id: string;
  sku?: string;
  nomeProduto: string;
  marca: string;
  precoCusto: number;
  precoVenda: number;
  link?: string;
  Observacao?: string;
  orcamentoId: string;
  dataCriacao: string;
};
