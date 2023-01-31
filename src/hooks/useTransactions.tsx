import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transaction{
    id:number;
    name:string;
    value:number;
    type:string;
    category:string;
    data: string;
}

interface TransactionProviderProps{
    children: ReactNode;
}

interface TransactionInput{
    name:string;
    value:number;
    type:string;
    category:string;
}

interface TransactionContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextData>(
    {} as TransactionContextData
)

export function TransactionProvider({children}: TransactionProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])
    
    useEffect(() => {
        api.get('transaction/').then(response => setTransactions(response.data))
    }, []);

    async function createTransaction(transactionInput:TransactionInput){        
      const response = await api.post('/transaction/', transactionInput)
      const transaction = response.data;

      setTransactions([
        ...transactions,
        transaction
      ])
    }

    return(
        <TransactionContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}


export function useTransactions(){
    const context = useContext(TransactionContext)

    return context
}