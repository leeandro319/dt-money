import {createContext, useEffect, useState, ReactNode} from 'react'
import { api } from './services/api';

interface Transation {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
  }

type TransactionInput = Omit<Transation, 'id' | 'createdAt'>;

interface TransactiondContextDate {
    transactions: Transation[];
    createTransaction: (transaction: TransactionInput) => void ;
}

interface TransactionProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext<TransactiondContextDate>({} as TransactiondContextDate);

export function TransactionsProvider({children}: TransactionProviderProps){
    const [transactions, setTransaction] = useState<Transation[]>([]);

    useEffect(() => {
      api
        .get("/transactions")
        .then((response) => setTransaction(response.data.transactions));
    }, []);

    function createTransaction(transaction: TransactionInput){
        api.post('/transactions', transaction)
        
    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}} >
            {children}
        </TransactionsContext.Provider>
    )
}