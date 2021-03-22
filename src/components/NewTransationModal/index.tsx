import { FormEvent, useState, useContext } from "react";
import { api } from "../../services/api";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'


import { Container, TransationTypeContainer, RadioBox } from "./styles";
import { TransactionsContext } from "../../TransactionsContext";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {

  const {createTransaction} = useContext(TransactionsContext)

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')

  const [type, setType] = useState('deposit')
    
  function handleCreateNewTransaction(event: FormEvent){
    event.preventDefault();
    createTransaction({
      title,
      amount,
      category,
      type,
    })

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="submit" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar Janela" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input 
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
          />
        <input 
          placeholder="Valor" 
          type="number"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
          />
        <TransationTypeContainer>
            <RadioBox 
              type="button"
              onClick={()=>{setType('deposit')}}
              isActive={type ==='deposit'}
              activeColor="green"
              >
                <img src={incomeImg} alt="Entrada"/>
                <span>Entrada</span>
            </RadioBox>
            <RadioBox type="button"
             onClick={()=>{setType('withdraw')}}
             isActive={type ==='withdraw'}
             activeColor="red"
             >
                <img src={outcomeImg} alt="Entrada"/>
                <span>Saída</span>
            </RadioBox>

        </TransationTypeContainer>
        <input 
            placeholder="Categoria" 
            value={category}
            onChange={event => setCategory(event.target.value)}/>
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
