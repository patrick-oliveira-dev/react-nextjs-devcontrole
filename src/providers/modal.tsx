"use client"

import { createContext, ReactNode, useState } from "react"
import { TicketProps } from "@/models/ticket.type"
import { CustomerProps } from "@/models/customer.type"
import { ModalTicket } from "@/components/modal"

interface TicketInfo {
    ticket: TicketProps
    customer: CustomerProps | null
}

interface ModalContextData {
    visible: boolean
    handleModalVisible: ()=> void
    ticket: TicketInfo | undefined
    setDetailTicket: (detail: TicketInfo)=> void
}

export const ModalContext = createContext( {} as ModalContextData )

export const ModalProvider = ({ children }: { children: ReactNode }) => {

    const [ticket, setTicket] = useState<TicketInfo>()
    const [visible, setVisible] = useState(false)

    function handleModalVisible() {
        setVisible(!visible)
    }

    function setDetailTicket( detail: TicketInfo ) {
        setTicket(detail)
    }

    return (
        <ModalContext.Provider value={{ visible, handleModalVisible, ticket, setDetailTicket }}>
            {visible && (
                <ModalTicket/>
            )}
            { children }
        </ModalContext.Provider>
    )
}