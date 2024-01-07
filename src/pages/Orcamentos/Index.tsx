import { useQuery } from "react-query";
import { api } from "../../services/api";
import { TOrcamento } from "../../types/Orcamento";
import { dateFormatter } from "../../utils/formatter";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalNovoOrcamento from "./ModalNovoOrcamento";
import Spinner from "../../assets/tube-spinner.svg";

export default function Orcamentos() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data, isLoading } = useQuery<TOrcamento[]>(
    "orcamentos",
    async () => {
      const response = await api.get(`/orcamentos`);

      return response.data.data;
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      <main className="p-1 border border-gray-400 shadow-lg h-full">
        <div className="mb-2">
          <button
            className="px-4 py-1 rounded-sm   
            bg-slate-900 hover:bg-slate-800
           text-slate-400 hover:text-gray-300 transition duration-300 ease-in  
             "
            onClick={() => setIsOpen(true)}
          >
            <i className="bi bi-clipboard-plus-fill mr-3"></i>
            Novo
          </button>
        </div>

        <ModalNovoOrcamento isOpen={isOpen} setIsOpen={setIsOpen} />

        {isLoading ? (
          <div className="flex items-start justify-center w-full h-full">
            <div className="w-max h-20 text-center">
              <span>Carregando...</span>
              <img className="text-blue-400" src={Spinner} alt="" />
            </div>
          </div>
        ) : (
          <table className="w-full text-sm text-center rtl:text-right  text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th>Cliente</th>
                <th>Carro</th>
                <th>Placa</th>
                <th>Chassi</th>
                <th>DataCriacão</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 border-b border-gray-700 text-gray-400  ">
              {data?.map((item: TOrcamento) => {
                return (
                  <tr
                    className="hover:bg-gray-700 hover:text-gray-300 transition-all border-b border-b-gray-600 "
                    key={item.id}
                  >
                    <td className="px-1 py-2 text-left">
                      <Link to={`/app-react-painel/orcamento/${item.id}`}>
                        {item.cliente}
                      </Link>
                    </td>
                    <td className="px-1 py-2">{item.carro}</td>
                    <td className="px-1 py-2">{item.placa}</td>
                    <td className="px-1 py-2">{item.chassis}</td>
                    <td className="px-1 py-2">
                      {dateFormatter.format(new Date(item.createdAt))}
                    </td>
                    <td>
                      <Link to={`/app-react-painel/orcamento/${item.id}`}>
                        <i
                          title="Detalhes"
                          className="bi bi-card-list py-1 px-2 rounded-sm bg-slate-900 hover:bg-slate-400 transition duration-300 ease-in"
                        ></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}
