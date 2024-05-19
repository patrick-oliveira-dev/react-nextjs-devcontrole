import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import prismaClient from "@/lib/prisma"

export default async function Dashboard() {

  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/")
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session.user.id
      }
    }, include: {
      customer: true,
    }, orderBy: {
      created_at: "desc"
    }
  })

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white">Abrir chamado</Link>
        </div>

        <table className="min-w-full my-8">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left">DATA CADASTRO</th>
              <th className="font-medium text-left">STATUS</th>
              <th className="font-medium text-left">#</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map( ticket => (
              <TicketItem key={ticket.id} ticket={ticket} customer={ticket.customer}/>
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <h1 className="text-gray-600 text-center justify-center mt-7">Não existem chamados abertos no momento.</h1>
        )}
      </main>
    </Container>
  );
}
