import { Container, Content } from './styles'


interface HeaderPropos{
    onOpenNewTransactionModal: () => void;
}


export function Header({onOpenNewTransactionModal}: HeaderPropos){
    return (
        <Container>
            <Content>
                <img src="{logoImg}" alt="dt money" />
                <h1>dt money</h1>
                <button type="button" onClick={onOpenNewTransactionModal}>Nova transação</button>               
            </Content>
        </Container>
    )
}