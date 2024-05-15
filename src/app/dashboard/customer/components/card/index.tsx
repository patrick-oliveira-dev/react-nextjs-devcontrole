"use client"

import { api } from "@/lib/api";
import { CustomerProps } from "@/models/customer.type";
import { useRouter } from "next/navigation";


export function CardCustomer( { customer }: { customer: CustomerProps }) {

    const router = useRouter()

    async function handleDeleteCustomer() {

        try {

            const response = await api.delete("/api/customer", {
                params: {
                    id: customer.id
                }
            })
    
            router.refresh()
            
        } catch (err) {
            console.log(err)
        } 
            
    }
        

    return(
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 cursor-pointer hover:scale-105 duration-300">
            <h2>
                <a className="font-bold mr-1">Nome:</a>{customer.name}
            </h2>

            <p>
                <a className="font-bold mr-1">Email:</a>{customer.email}
            </p>

            <p>
                <a className="font-bold mr-1">Telefone:</a>{customer.phone}
            </p>

            <button 
                className="bg-red-500 px-4 rounded text-white mt-2 self-start"
                onClick={handleDeleteCustomer}
            >
                Deletar
            </button>
        </article>
    )
    
}