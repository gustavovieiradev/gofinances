import React from 'react';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { TransactionDataProps } from '../../components/TransactionCard';

import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  Username,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
} from './styles';

export interface DataListProps extends TransactionDataProps {
  id: string;
}

const Dashboard: React.FC = () => {

  const data: DataListProps[] = [
    {
      id: '1',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {icon: 'dollar-sign', name: 'Vendas'},
      date: "13/04/2020",
      type: 'positive'
    },
    {
      id: '2',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {icon: 'coffee', name: 'Alimentação'},
      date: "13/04/2020",
      type: 'negative'
    },
    {
      id: '3',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {icon: 'shopping-bag', name: 'Vendas'},
      date: "13/04/2020",
      type: 'negative'
    },
  ]
  

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/65176656?v=4'}} />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <Username>Gustavo</Username>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>


      </Header>

      <HighlightCards>
        <HighlightCard 
          title='Entradas' 
          amount='R$ 17.400,00' 
          lastTransaction='Última entrada dia 13 de abril'
          type='up'
        />
        <HighlightCard 
          title='Saídas' 
          amount='R$ 1.259,00' 
          lastTransaction='Última saída dia 03 de abril'
          type='down'
        />
        <HighlightCard 
          title='Total' 
          amount='R$ 16.141,00' 
          lastTransaction='01 à 16 de abril'
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList 
          data={data} 
          keyExtractor={item => item.id}
          renderItem={({item}) => <TransactionCard data={item}/>}
        />
      </Transactions>

    </Container>
  );
}

export default Dashboard;