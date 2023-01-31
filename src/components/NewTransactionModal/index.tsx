import Modal from "react-modal";
import { Container, TransactionTypeContainer, Radiobox } from "./styles";
import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import { FormEvent, useState } from 'react'
import { useTransactions } from "../../hooks/useTransactions";


interface NewTransactionModelProps{
    isOpen: boolean;
    onRequestClose: () => void;
  }
  
Modal.setAppElement('#root')

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModelProps) {
    const {createTransaction} = useTransactions();

    const [name, setName] = useState('')
    const [value, setValue] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit') 


    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();
        await createTransaction({
            name,
            value,
            category, 
            type
        });

        setName("");
        setValue(0);
        setCategory("");
        setType('deposit');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName = " react-modal-overlay"
            className="react-modal-content"
        >
            <button
             type="button"
             onClick={onRequestClose}
             className="react-modal-close">
                <img src={closeImg} alt="Fechar Modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                <input
                 placeholder="Titulo"
                value ={name}
                onChange={event => setName(event.target.value)}
                ></input>
                <input type="number"
                 placeholder="Valor"
                 value={value}
                 onChange={event => setValue(Number(event.target.value))}
                 ></input>
                <TransactionTypeContainer>
                    <Radiobox
                    type="button"
                    isActive={type === 'deposit'}
                    activeColor = "green"
                    onClick={() => {setType('deposit'); }}                    
                    >
                        <img src={incomeImg} alt="Entrada" /> <span>Entrada</span>
                    </Radiobox>
                    <Radiobox
                    type="button"
                    isActive={type === 'withdraw'}
                    activeColor = "red"
                    onClick={() => {setType('withdraw'); }}                      
                    >
                        <img src={outcomeImg} alt="Saida" /> <span>Saída</span>
                    </Radiobox>
                </TransactionTypeContainer>

                <input placeholder="Categoria"
                value ={category}
                onChange={event => setCategory(event.target.value)}
                ></input>
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}