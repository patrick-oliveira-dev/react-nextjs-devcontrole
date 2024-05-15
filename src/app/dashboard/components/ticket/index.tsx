import { FiFile, FiTrash2 } from "react-icons/fi";

export function TicketItem() {
    return(
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 bg-slate-100 last:border-b-0 hover:bg-gray-200 duration-300">
                <td className="text-left pl-1">
                    Mercado Silva
                </td>
                <td className="text-left">
                    01/04/2024
                </td>
                <td className="text-left">
                    <span className="bg-green-500 px-2 py-1 rounded">
                        ABERTO
                    </span>
                </td>
                <td className="text-left">
                    <button className="mr-2">
                        <FiTrash2 size={24} className="text-red-500 hover:animate-bounce"/>
                    </button>
                    
                    <button>
                        <FiFile size={24} className="text-blue-500 hover:animate-bounce"/>
                    </button>
                </td>
            </tr>
        </>
    )
}