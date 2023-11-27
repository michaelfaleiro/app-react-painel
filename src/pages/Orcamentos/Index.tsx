import { useQuery } from "react-query";
import { api } from "../../services/api";
import { TOrcamento } from "../../types/Orcamento";
import { dateFormatter } from "../../utils/formatter";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalNovoOrcamento from "./ModalNovoOrcamento";

export default function Orcamentos() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data } = useQuery<TOrcamento[]>(
    "orcamentos",
    async () => {
      const response = await api.get(`/orcamentos`);

      return response.data;
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
                  <td>{item.veiculo}</td>
                  <td>{item.placa}</td>
                  <td>{item.chassi}</td>
                  <td>{dateFormatter.format(new Date(item.dataCriacao))}</td>
                  <td>
                    <Link to={`/orcamento/${item.id}`}>
                      <i className="bi bi-card-list"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}
