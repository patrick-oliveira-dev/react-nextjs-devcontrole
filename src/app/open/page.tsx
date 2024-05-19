"use client";

import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { FormTicket } from "./components/FormTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email do cliente para localizar.")
    .min(1, "O campo email é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/customer", {
        params: {
            email: data.email
        }
    })

    if (response.data === null) {
        setError("email", {type: "custom", message: "Ops! Cliente não foi encontrado."})
        return
    }
    setCustomer({
        id: response.data.id,
        name: response.data.name
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24 mb-10">
        Abrir chamado
      </h1>
      {customer ? (
        <>
          <div className="flex items-center justify-between bg-slate-200 py-6 px-2 rounded border-2">
            <p className="text-lg">
              <strong className="mr-2">Cliente selecionado:</strong>
              {customer.name}
            </p>
            <button
              onClick={handleClearCustomer}
              className="px-2 py-1 rounded hover:cursor-pointer hover:scale-125 transition-all duration-150"
            >
              <FiX size={30} className="text-red-500" />
            </button>
          </div>
          <FormTicket customer={customer} />
        </>
      ) : (
        <main className="flex flex-col mt-4 mb-2">
          <form onSubmit={handleSubmit(handleSearchCustomer)} className="bg-slate-200 py-6 px-2 rounded border-2">
            <div className="flex">
              <Input
                name="email"
                placeholder="Digite o email do cliente..."
                type="email"
                register={register}
              />
              <button type="submit" className="bg-blue-400 px-2 py-1 rounded">
                <FiSearch size={24} color="white" />
              </button>
            </div>
            {errors.email?.message && <p className="text-red-500 mt-2 mx-1">{errors.email?.message}</p>}

          </form>
        </main>
      )}
    </div>
  );
}
