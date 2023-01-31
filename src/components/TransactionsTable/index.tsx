import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";


export function TransactionsTable(){
    const { transactions } = useTransactions()
    console.log( transactions )

    return (
        <Container>
            <table>
                <thead>
                    <th>Titulo</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Data</th>
                </thead>
                <tbody>
                    {transactions.map(transaction => {
                        return (
                        <tr>
                            <td>{transaction.name}</td>
                            <td className={transaction.type}>
                                {new Intl.NumberFormat('pt-BR', {
                                    style:'currency',
                                    currency: "BRL",
                                }).format(transaction.value)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {new Intl.DateTimeFormat("pt-BR").format(new Date(transaction.data))}
                            </td>
                            </tr>
                        )
                        })}                    
                </tbody>
            </table>
        </Container>
    )
}