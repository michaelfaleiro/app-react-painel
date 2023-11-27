import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { TOrcamento, TProduto } from "../../types/Orcamento";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { queryClient } from "../../services/queryClient";
import NovoProduto from "./NovoProduto";
import { useState } from "react";

export default function OrcamentoDetalhes() {
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data } = useQuery<TOrcamento>(
    "orcamentoId",
    async () => {
      const response = await api.get(`/orcamentos/${id}`);

      return response.data;
    },
    { refetchOnWindowFocus: false }
  );

  const removeProduto = async (idProduto: string) => {
    const response = await api.delete(`/orcamentos/removeproduto/${idProduto}`);

    await queryClient.invalidateQueries(["orcamentoId"]);
    return response;
  };

  return (
    <>
      <div className="flex flex-row h-full">
        <header className="border p-1 flex flex-col">
          <div className="grow min-w-max">
            <h3 className=" text-center">Dados Cliente</h3>

            <p>
              Cliente: <span>{data?.cliente}</span>
            </p>
            <p>
              Carro: <span>{data?.veiculo}</span>
            </p>
            <p>
              Placa: <span>{data?.veiculo}</span>
            </p>
            <p>
              Chassi: <span>{data?.chassi}</span>
            </p>
            <p>
              Data Criação: <span>{data?.dataCriacao}</span>
            </p>
          </div>

          <footer className="shrink-0">
            <h4 className="text-center border-t p-1">Totais</h4>
            <section className="p-1">
              <p>
                Produtos : <span>R$ 150,00</span>
              </p>
              <p>
                Cupom : <span>R$ 0.00</span>
              </p>
              <p>
                Pix : <span>R$ 0.00</span>
              </p>
              <p>
                Frete : <span>R$ 0.00 </span>
              </p>
              <p>
                Total : <span>R$ 150.00 </span>
              </p>
            </section>
          </footer>
        </header>
        <section className="grow p-1 border">
          <h3>DETALHES DO ORCAMENTO</h3>

          <div className="pb-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-cyan-700 px-5 py-1 hover:bg-cyan-600 "
            >
              <i className="bi bi-cart-plus-fill text-cyan-100"></i>
            </button>
          </div>
          <NovoProduto isOpen={isOpen} setIsOpen={setIsOpen} orcId={data?.id} />
          <table className="w-full text-base text-left border rounded-sm  ">
            <thead className="text-base uppercase bg-zinc-700 text-zinc-400 ">
              <tr>
                <th>Produto</th>
                <th>Sku</th>
                <th>Marca</th>
                <th>Custo</th>
                <th>Venda</th>
                <th>Link Produto</th>
                <th>Adicionado</th>
                <th></th>
              </tr>
            </thead>
            <tbody className=" bg-gray-400 border-b border-gray-700   ">
              {data?.produtos?.map((item: TProduto) => {
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-300 border-b border-b-gray-600 text-md-"
                  >
                    <td className="px-1 py-2">{item.nomeProduto}</td>
                    <td className="px-1 py-2">{item.sku}</td>
                    <td className="px-1 py-2">{item.marca}</td>
                    <td className="px-1 py-2">
                      {priceFormatter.format(item.precoCusto)}
                    </td>
                    <td className="px-6 py-4">
                      {priceFormatter.format(item.precoVenda)}
                    </td>
                    <td>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-browser-chrome"></i>
                      </a>
                    </td>
                    <td>{dateFormatter.format(new Date(item.dataCriacao))}</td>
                    <td>
                      <button type="button">
                        <i
                          onClick={() => removeProduto(item.id)}
                          className="bi bi-trash3-fill"
                        ></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
