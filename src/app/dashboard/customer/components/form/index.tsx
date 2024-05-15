"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export function NewCustomerForm({ userId }: { userId: string}) {
  const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z
      .string()
      .email("Digite um email válido")
      .min(1, "O email é obrigatório"),
    phone: z.string().refine(
      (value) => {
        return (
          /^(?:\(\d{2}\)\$?)?\d{9}$/.test(value) ||
          /^\d{2}\s\d{9}$/.test(value) ||
          /^\d{11}$/.test(value)
        );
      },
      {
        message: "O numero de telefone deve estar no padrão: (DD) 999999999",
      }
    ),
    address: z.string(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter()

  async function handleRegisterCustomer(data: FormData) {
    await api.post("/api/customer", {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        userId: userId
    })

    router.refresh()
    router.replace("/dashboard/customer")
  }

  return (
    <form className="flex flex-col mt-6" onSubmit={handleSubmit(handleRegisterCustomer)}>

      <label className="mb-1 text-lg font-medium"> Nome Completo</label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors.name?.message}
        register={register}
      />

      <div className="flex flex-col gap-2 w-full my-2 md:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium"> Telefone</label>
          <Input
            type="number"
            name="phone"
            placeholder="Exemplo: (34)998968434"
            error={errors.phone?.message}
            register={register}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 text-lg font-medium"> E-mail</label>
          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail..."
            error={errors.email?.message}
            register={register}
          />
        </div>

      </div>

      <label className="mb-1 text-lg font-medium"> Endereço</label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço do cliente..."
        error={errors.address?.message}
        register={register}
      />

      <button type="submit" className="bg-blue-500 px-2 h-11 rounded text-white font-bold my-4">
        Cadastrar
      </button>

    </form>
  );
}
