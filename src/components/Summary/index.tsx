import incomeImg from  "../../assets/income.svg";
import outcomeImg from  "../../assets/outcome.svg";
import totalImg from "../../assets/money.svg"

import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";


export function Summary(){
    
const { transactions } = useTransactions()

    const totalDeposit = transactions.reduce((acc, transactions) => {
        if (transactions.type === "deposit"){
            return acc + transactions.value
        }
        return acc
    }, 0);

    const totalWithdraw = transactions.reduce((acc, transactions) => {
        if (transactions.type === "withdraw"){
            return acc + transactions.value
        }
        return acc
    }, 0);

    const total = totalDeposit - totalWithdraw

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                                    style:'currency',
                                    currency: "BRL",
                                }).format(totalDeposit)}</strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomeImg} alt="Saidas" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                                    style:'currency',
                                    currency: "BRL",
                                }).format(totalWithdraw)} </strong>
            </div>
            <div className="hightlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>{new Intl.NumberFormat('pt-BR', {
                                    style:'currency',
                                    currency: "BRL",
                                }).format(total)}</strong>
            </div>
        </Container>
        
    )
}