import {createContext, useEffect, useState, ReactNode, useContext} from 'react'
import { api } from '../services/api';

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
    createTransaction: (transaction: TransactionInput) => Promise<void> ;
}

interface TransactionProviderProps {
    children: ReactNode;
}

const TransactionsContext = createContext<TransactiondContextDate>({} as TransactiondContextDate);

export function TransactionsProvider({children}: TransactionProviderProps){
    const [transactions, setTransaction] = useState<Transation[]>([]);

    useEffect(() => {
      api
        .get("/transactions")
        .then((response) => setTransaction(response.data.transactions));
    }, []);

   async function createTransaction(transactionInput: TransactionInput){
     const response = await api.post('/transactions', {
         ...transactionInput,
         createdAt: new Date()
     })
     const {transaction} = response.data;
     setTransaction([
         ...transactions,
         transaction,
     ])
    }

    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}} >
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)
    return context;
}