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
      <main>
        <div className="mb-3">
          <button
            className="bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4"
            onClick={() => setIsOpen(true)}
          >
            Novo Orcamento
          </button>
        </div>

        <ModalNovoOrcamento isOpen={isOpen} setIsOpen={setIsOpen} />

        {isLoading ? (
          <div className="flex items-start justify-center w-full h-screen">
            <div className="w-max h-20 text-center">
              <span>Carregando...</span>
              <img src={Spinner} alt="" />
            </div>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right  text-gray-400">
            <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
              <tr>
                <th>Cliente</th>
                <th>Carro</th>
                <th>Placa</th>
                <th>Chassi</th>
                <th>DataCriacão</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 border-b border-gray-700  ">
              {data?.map((item: TOrcamento) => {
                return (
                  <tr key={item.id}>
                    <td>{item.cliente}</td>
                    <td>{item.carro}</td>
                    <td>{item.placa}</td>
                    <td>{item.chassis}</td>
                    <td>{dateFormatter.format(new Date(item.createdAt))}</td>
                    <td>
                      <Link to={`/app-react-painel/orcamento/${item.id}`}>
                        <i className="bi bi-card-list"></i>
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
