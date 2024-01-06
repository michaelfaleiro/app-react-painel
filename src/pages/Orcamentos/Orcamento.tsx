import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { TOrcamento, TProduto } from "../../types/Orcamento";
import { priceFormatter } from "../../utils/formatter";
import { queryClient } from "../../services/queryClient";
import NovoProduto from "./NovoProduto";
import { useState } from "react";

import Spinner from "../../assets/tube-spinner.svg";

export default function OrcamentoDetalhes() {
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, isLoading } = useQuery<TOrcamento>(
    "orcamentoId",
    async () => {
      const response = await api.get(`/orcamentos/${id}`);

      return response.data.data;
    },
    { refetchOnWindowFocus: false }
  );

  const removeProduto = async (idProduto: string) => {
    const response = await api.delete(`/orcamentos/${id}/${idProduto}`);

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
              Carro: <span>{data?.carro}</span>
            </p>
            <p>
              Placa: <span>{data?.placa}</span>
            </p>
            <p>
              Chassi: <span>{data?.chassis}</span>
            </p>
            <p>
              Data Criação:
              {/* <span>{dateFormatter.format(new Date(data?.createdAt))}</span> */}
            </p>
          </div>

          <footer className="shrink-0">
            <h4 className="text-center border-t p-1">Totais</h4>
            <section className="p-1">
              <p>
                Produtos : <span> {priceFormatter.format(data?.total)}</span>
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
                Total : <span>{priceFormatter.format(data?.total)}</span>
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

          {isLoading ? (
            <div className="flex items-start justify-center w-full h-screen">
              <div className="w-max h-20 text-center">
                <span>Carregando...</span>
                <img src={Spinner} alt="" />
              </div>
            </div>
          ) : (
            <table className="w-full text-base text-left border rounded-sm  ">
              <thead className="text-base uppercase bg-zinc-700 text-zinc-400 ">
                <tr>
                  <th>Quant</th>
                  <th>Produto</th>
                  <th>Sku</th>
                  <th>Marca</th>
                  <th>Custo</th>
                  <th>Venda</th>
                  <th>Link Produto</th>
                  <th>Total</th>
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
                      <td className="px-1 py-2">{item.quantidade}</td>
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
                      <td>
                        {priceFormatter.format(
                          item.quantidade * item.precoVenda
                        )}
                      </td>
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
          )}
        </section>
      </div>
    </>
  );
}
