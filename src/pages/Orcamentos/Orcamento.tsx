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
      <div className="flex flex-row h-full bg-gray-500 ">
        <header className="border border-gray-400 p-1 flex flex-col">
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
        <section className="grow p-1 border border-gray-400 shadow-2xl">
          <h3>DETALHES DO ORCAMENTO</h3>

          <div className="pb-1">
            <button
              title="Adicionar Produto"
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-1 rounded-sm   
              bg-slate-900 hover:bg-slate-700
             text-slate-400 hover:text-gray-300 transition duration-300 ease-in"
            >
              <i className="bi bi-cart-plus-fill mr-2 "></i>
              Novo
            </button>
          </div>
          <NovoProduto isOpen={isOpen} setIsOpen={setIsOpen} orcId={data?.id} />

          {isLoading ? (
            <div className="flex items-start justify-center w-full h-screen">
              <div className="w-max h-20 text-center">
                <span>Carregando.....</span>
                <img src={Spinner} alt="spinner" />
              </div>
            </div>
          ) : (
            <table className="w-full text-sm text-center rtl:text-right  text-gray-400   ">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400  ">
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
              <tbody className=" bg-gray-800 border-b border-gray-700 text-gray-400   ">
                {data?.produtos?.map((item: TProduto) => {
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-700 hover:text-gray-300 duration-300 ease-linear border-b border-b-gray-600"
                    >
                      <td className="px-1 py-2">{item.quantidade}</td>
                      <td className="px-1 py-2 text-left">
                        {item.nomeProduto}
                      </td>
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
                          <i
                            title="Link do Produto"
                            className="bi bi-browser-chrome px-2 py-1 text-blue-400 hover:text-blue-600 hover:text-lg duration-500 ease-in"
                          >
                            Link
                          </i>
                        </a>
                      </td>
                      <td>
                        {priceFormatter.format(
                          item.quantidade * item.precoVenda
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => removeProduto(item.id)}
                          className="px-3 py-1 rounded-sm      
                                bg-red-900 hover:bg-red-600 transition duration-500 ease-in-out
                                text-rose-300"
                        >
                          <i
                            title="Excluir Produto"
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
