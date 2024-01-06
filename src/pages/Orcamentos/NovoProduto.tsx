import { useState } from "react";
import { z } from "zod";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
  orcId?: string;
}

const schemaInput = z.object({
  nomeProduto: z.string().min(1, { message: "Informe o Produto" }),
  sku: z.string().toUpperCase().min(1, { message: "Informe o sku" }),
  marca: z.string().toUpperCase().min(1, { message: "Informe a Marca" }),
  quantidade: z.number(),
  precoCusto: z.number(),
  precoVenda: z.number(),
  link: z.string().optional(),
  observacao: z.string().optional(),
  orcamentoId: z.string(),
});

type TInput = z.infer<typeof schemaInput>;

export default function NovoProduto({ isOpen, setIsOpen, orcId }: Props) {
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
      .post(`/orcamentos/${orcId}`, data)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
    reset();
    setIsOpen(false);

    await queryClient.invalidateQueries(["orcamentoId"]);
    setIsLoading(false);
  };

  console.log(orcId);

  if (isOpen) {
    return (
      <>
        <form action="" onSubmit={onSubmit(handleSubmit)}>
          <div className="flex border flex-wrap gap-2 p-1">
            <div className="flex flex-col w-[3rem]">
              <label htmlFor="quantidade" className="">
                Quant
              </label>
              <input
                type="text"
                id="quantidade"
                defaultValue={1}
                className="text-black p-1 rounded-md focus:bg-gray-300"
                {...register("quantidade", { valueAsNumber: true })}
              />

              {errors.quantidade && (
                <span className="text-red-400 font-semibold">
                  {errors.quantidade.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-[26rem]">
              <label htmlFor="nomeProduto" className="">
                Produto
              </label>
              <input
                type="text"
                id="nomeProduto"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                {...register("nomeProduto")}
              />

              {errors.nomeProduto && (
                <span className="text-red-400 font-semibold">
                  {errors.nomeProduto.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="sku" className="">
                Sku
              </label>
              <input
                type="text"
                id="sku"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                {...register("sku")}
              />

              {errors.sku && (
                <span className="text-red-400 font-semibold">
                  {errors.sku.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="precoCusto" className="">
                Custo
              </label>
              <input
                type="text"
                id="precoCusto"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                defaultValue="0"
                {...register("precoCusto", { valueAsNumber: true })}
              />

              {errors.precoCusto && (
                <span className="text-red-400 font-semibold">
                  {errors.precoCusto.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="precoVenda" className="">
                Venda
              </label>
              <input
                type="text"
                id="precoVenda"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                defaultValue="0"
                {...register("precoVenda", { valueAsNumber: true })}
              />

              {errors.precoVenda && (
                <span className="text-red-400 font-semibold">
                  {errors.precoVenda.message}
                </span>
              )}
            </div>

            <div className="flex flex-col ">
              <label htmlFor="marca" className="">
                Marca
              </label>
              <input
                type="text"
                id="marca"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                {...register("marca")}
              />

              {errors.marca && (
                <span className="text-red-400 font-semibold">
                  {errors.marca.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-[30rem]">
              <label htmlFor="link" className="">
                Link
              </label>
              <input
                type="text"
                id="link"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                {...register("link")}
              />

              {errors.link && (
                <span className="text-red-400 font-semibold">
                  {errors.link.message}
                </span>
              )}
            </div>

            <div className="flex flex-col w-[30rem]">
              <label htmlFor="observacao" className="">
                Observação
              </label>
              <input
                type="text"
                id="observacao"
                className="text-black p-1 rounded-md focus:bg-gray-300"
                {...register("observacao")}
              />

              {errors.observacao && (
                <span className="text-red-400 font-semibold">
                  {errors.observacao.message}
                </span>
              )}
            </div>

            <div className="hidden">
              <label htmlFor="orcamentoId" className="">
                orcamentoId
              </label>
              <input
                type="text"
                id="orcamentoId"
                value={orcId}
                {...register("orcamentoId")}
              />

              {errors.orcamentoId && (
                <span className="text-red-400 font-semibold">
                  {errors.orcamentoId.message}
                </span>
              )}
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
                <button className="py-5 items-center">
                  <i className="bi bi-file-earmark-plus-fill pt-3 text-2xl text-red-800 hover:text-red-500"></i>
                </button>
              </>
            )}
          </div>
        </form>
      </>
    );
  } else {
    null;
  }
}
