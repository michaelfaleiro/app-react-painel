import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const schemaInput = z.object({
  cliente: z.string().min(1, { message: "Informe o Cliente" }),
  telefone: z.string(),
  carro: z.string(),
  placa: z
    .string()
    .max(7, { message: "Apenas 7 digitos" })
    .toUpperCase()
    .optional(),
  chassis: z.string().toUpperCase().optional(),
});

type TInput = z.infer<typeof schemaInput>;

export default function ModalNovoOrcamento({ isOpen, setIsOpen }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<TInput>({ resolver: zodResolver(schemaInput) });

  const handleSubmit = async (data: TInput | unknown) => {
    setIsLoading(true);
    await api
      .post("/orcamentos", data)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    reset();
    setIsOpen(false);

    await queryClient.invalidateQueries(["orcamentos"]);
    setIsLoading(false);
  };

  if (isOpen) {
    return (
      <div className="fixed inset-0   justify-center flex items-cente">
        <div className="bg-slate-700 p-2 mb-3 h-[600px] rounded-md text-gray-300 ">
          <div className=" flex mb-4 justify-between ">
            <h5 className="font-semibold ">Novo Orcamento</h5>
            <button
              onClick={function () {
                reset();
                setIsOpen(!open);
              }}
              type="button"
              className="text-white bg-red-700 hover:bg-blue-800 focus:outline-none focus:ring-4
                          text-sm px-5 py-1.5 text-center mr-2 mb-2 rounded-full"
            >
              X
            </button>
          </div>

          <form onSubmit={onSubmit(handleSubmit)} className="">
            <div className="flex gap-2 w-96 flex-wrap">
              <div className="flex flex-col w-[58%]">
                <label htmlFor="cliente" className="">
                  Cliente
                </label>
                <input
                  type="text"
                  id="cliente"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("cliente")}
                />

                {errors.cliente && (
                  <span className="text-red-400 font-semibold">
                    {errors.cliente.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-[58%]">
                <label htmlFor="cliente" className="">
                  Telefone
                </label>
                <input
                  type="text"
                  id="telefone"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("telefone")}
                />

                {errors.telefone && (
                  <span className="text-red-400 font-semibold">
                    {errors.telefone.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col h-16 w-[58%] ">
                <label htmlFor="veiculo" className="">
                  Veiculo
                </label>
                <input
                  type="text"
                  id="carro"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("carro")}
                />
                {errors.carro && (
                  <span className="text-red-400 font-semibold">
                    {errors.carro.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-[38%]">
                <label htmlFor="placa" className="">
                  Placa
                </label>
                <input
                  type="text"
                  id="placa"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("placa")}
                />
                {errors.placa && (
                  <span className="text-red-400 font-semibold">
                    {errors.placa.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-full h-20">
                <label htmlFor="chassi" className="">
                  Chassi
                </label>
                <input
                  type="text"
                  id="chassis"
                  className="text-black p-1 rounded-md focus:bg-gray-300"
                  {...register("chassis")}
                />
                {errors.chassis && (
                  <span className="text-red-400 font-semibold">
                    {errors.chassis.message}
                  </span>
                )}
              </div>
            </div>
            {isLoading ? (
              <>
                <button
                  disabled
                  type="button"
                  className="text-white bg-slate-800 focus:outline-none focus:ring-4
                    text-sm px-5 py-1.5 text-center mr-2 mb-2 rounded-full"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Salvando...
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4
                text-sm px-5 py-1.5 text-center mr-2 mb-2 rounded-full
            "
                >
                  Adicionar
                </button>
              </>
            )}

            <button
              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4
                text-sm px-5 py-1.5 text-center mr-2 mb-2 rounded-full"
              type="button"
              onClick={function () {
                reset();
                setIsOpen(!open);
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    null;
  }
}
