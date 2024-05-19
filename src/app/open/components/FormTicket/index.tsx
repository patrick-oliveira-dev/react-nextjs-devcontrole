
import { Input } from "@/components/input"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { api } from "@/lib/api"
import { CustomerDataInfo } from "../../page"

const schema = z.object({
    title: z.string().min(1, "O título do chamado é obrigatório"),
    description: z.string().min(1, "Descreva seu problema...")
})

type FormData = z.infer<typeof schema>

interface FormTicketProps {
    customer: CustomerDataInfo
}

export function FormTicket( { customer }: FormTicketProps ) {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function handleRegisterTicket( data: FormData ) {
        await api.post("/api/ticket", {
            name: data.title,
            description: data.description,
            customerId: customer.id
        })

        setValue("title", "")
        setValue("description", "")
    }

    return(
        <form className="bg-slate-200 mt-6 px-4 py-6 rounded border-2 flex flex-col gap-2" onSubmit={handleSubmit(handleRegisterTicket)}>
            <label className="mb-1 font-medium text-lg">
                Título do chamado
            </label>
            <Input 
                name="title" 
                type="text" 
                placeholder="Título do chamado"
                register={register}
                error={errors.title?.message}
            />
            <label className="mb-1 font-medium text-lg mt-2">
                Descrição
            </label>
            <textarea
                className="w-full border-2 rounded-md h-40 resize-none px-2" 
                id="description"  
                placeholder="Descreva seu problema..."
                {...register("description")}
            >
            </textarea>
            {errors.description?.message && <p className="text-red-500 my-1">{errors.description?.message}</p>}
            
            <button className="bg-blue-500 px-4 h-11 text-white font-semibold rounded w-full">
                Cadastrar
            </button>
        </form>
    )
}