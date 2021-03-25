import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";

import Modal from 'react-modal'
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransationModal";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root')

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransationModalOpen] = useState(false);
    
  function handleOpenNewTransationModal(){
      setIsNewTransationModalOpen(true);
  }

  function handleCloseNewTransationModal(){
      setIsNewTransationModalOpen(false);
  }

  return (
      <TransactionsProvider>
        <Header onOpenNewTransationModal={handleOpenNewTransationModal}/>
        <Dashboard/>
        <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransationModal}/>

        <GlobalStyle/>
      </TransactionsProvider>
  );
}


