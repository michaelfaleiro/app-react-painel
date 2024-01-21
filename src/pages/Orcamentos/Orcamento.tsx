import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { TOrcamento, TProduto } from "../../types/Orcamento";
import { priceFormatter } from "../../utils/formatter";
import { queryClient } from "../../services/queryClient";
import NovoProduto from "./NovoProduto";
import { useState } from "react";

import Spinner from "../../assets/tube-spinner.svg";
import { PdfOrcamento } from "../../Reports/PdfOrcamento";

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
      <div className="flex flex-row h-full  ">
        <header className="border border-gray-700 p-1 flex flex-col">
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
        <section className="grow px-3 border border-gray-700 shadow-2xl">
          <h3 className="text-center text-xl font-semibold">
            Detalhes Orçamento
          </h3>

          <div className="pb-1 flex gap-3 ">
            <button
              title="Adicionar Produto"
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-1 rounded-sm    
              bg-slate-700 hover:bg-slate-600
             text-slate-400 hover:text-gray-300 transition duration-300 ease-in"
            >
              <i className="bi bi-cart-plus-fill mr-2 "></i>
              Novo
            </button>

            <button
              className="px-4 py-1 rounded-sm   
              bg-red-900 hover:bg-red-800
             text-slate-400 hover:text-gray-300 transition duration-300 ease-in"
              onClick={() => PdfOrcamento(data?.produtos!)}
              title="Gerar Pdf"
            >
              <i className="bi bi-filetype-pdf mr-2"></i>
              Pdf
            </button>
          </div>

          <div className="transition duration-700">
            <NovoProduto
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              orcId={data?.id}
            />
          </div>

          {isLoading ? (
            <div className="flex items-start justify-center w-full h-screen">
              <div className="w-max h-20 text-center">
                <span>Carregando.....</span>
                <img src={Spinner} alt="spinner" />
              </div>
            </div>
          ) : (
            <table className="w-full text-sm text-left rtl:text-right  text-gray-400   ">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400  ">
                <tr>
                  <th>Quant</th>
                  <th>Produto</th>
                  <th>Sku</th>
                  <th>Marca</th>
                  <th>Link Produto</th>
                  <th className="text-center">Venda</th>
                  <th className="text-center">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className=" bg-gray-800 border-b text-left border-gray-700 text-gray-400   ">
                {data?.produtos?.map((item: TProduto) => {
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-700 hover:text-gray-300 duration-300 ease-linear border-b border-b-gray-600"
                    >
                      <td className="px-1 py-2 text-center">
                        {item.quantidade}
                      </td>
                      <td className="px-1 py-2 ">{item.nomeProduto}</td>
                      <td className="px-1 py-2">{item.sku}</td>
                      <td className="px-1 py-2">{item.marca}</td>
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
                      <td className="px-6 py-4 text-center">
                        {priceFormatter.format(item.precoVenda)}
                      </td>
                      <td className="px6- py-4 text-center">
                        {priceFormatter.format(
                          item.quantidade * item.precoVenda
                        )}
                      </td>
                      <td className="">
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
