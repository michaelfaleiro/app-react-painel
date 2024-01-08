import { TProduto } from "../types/Orcamento";

const priceFormatter = new Intl.NumberFormat("pt-Br", {
  style: "currency",
  currency: "BRL",
});

export interface Orcamento {
  quantidade: number;
  nomeProduto: string;
  marca: string;
  precoVenda: number;
}

export async function PdfOrcamento(orcamentos: TProduto[]) {
  const pdfMakeModule = await import("pdfmake/build/pdfmake.min");
  const pdfFontsModule = await import("pdfmake/build/vfs_fonts");

  const pdfMake = pdfMakeModule.default;
  const pdfFonts = pdfFontsModule.default;

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle: any = [
    {
      text: "Orcamento",
      fontSize: 15,
      bold: true,
      margin: [250, 20, 0, 45], // left, top, right, bottom
    },
  ];

  const dados = orcamentos.map((orcamento) => [
    {
      text: orcamento.quantidade.toString(),
      alignment: "center",
    },
    {
      text: orcamento.nomeProduto,
    },
    {
      text: orcamento.marca,
    },
    {
      text: priceFormatter.format(orcamento.precoVenda),
      alignment: "center",
    },
    {
      text: priceFormatter.format(orcamento.quantidade * orcamento.precoVenda),
      alignment: "center",
    },
  ]);

  const totalRow = [
    {},
    {},
    {},
    {
      text: "Total",
      fontSize: 10,
      alignment: "center",
      bold: true,
    },
    {
      text: priceFormatter.format(
        orcamentos.reduce(
          (total, orcamento) =>
            total + orcamento.quantidade * orcamento.precoVenda,
          0
        )
      ),
    },
  ];

  const details = [
    {
      table: {
        widths: [30, 250, 60, 60, 60],
        headerRows: 1,
        body: [
          [
            { text: "Quant", fontSize: 10, alignment: "center", bold: true },
            { text: "Produto", fontSize: 10, alignment: "center", bold: true },
            { text: "Marca", fontSize: 10, alignment: "center", bold: true },
            { text: "Unitário", fontSize: 10, alignment: "center", bold: true },
            { text: "Total", fontSize: 10, alignment: "center", bold: true },
          ],
          ...dados,
          totalRow,
        ],
      },
    },
  ];

  function Rodape() {
    return [
      {
        text: "",
      },
    ];
  }

  const docDefinitions: any = {
    pageSize: "A4",
    pageMargin: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: Rodape,
  };

  pdfMake.createPdf(docDefinitions).open();
}
