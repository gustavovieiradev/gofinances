import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
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
  LogoutButton,
} from './styles';

export interface DataListProps extends TransactionDataProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}
interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

const Dashboard: React.FC = () => {

  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  const getLastTransactionDate = (collection: DataListProps[], type: 'positive' | 'negative') => {
    const lastTransactions = new Date(Math.max.apply(
      Math, collection.filter(d => d.type === type).map(d => new Date(d.date).getTime())
    ))

    return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', {month: 'long'})}`

    // return Intl.DateTimeFormat('pt-BR', {
    //   day: '2-digit',
    //   month: '2-digit',
    //   year: 'numeric'
    // }).format(new Date(lastTransactions))
  }

  const loadTransaction = async () =>  {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : []

    let entriesSum = 0;
    let expensiveSum = 0;

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

      if (item.type === 'positive') {
        entriesSum += Number(item.amount)
      } else {
        expensiveSum += Number(item.amount)
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        amount,
        date,
        type: item.type,
        category: item.category
      }

    })
    setData(transactionsFormatted);
    const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive')
    const lastTransactionsExpensive = getLastTransactionDate(transactions, 'negative')
    const totalInterval = `01 a ${lastTransactionsEntries}`

    const total = entriesSum - expensiveSum;

    setHighlightData({
      entries: {
        amount: entriesSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionsEntries
      },
      expensives: {
        amount: expensiveSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionsExpensive
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })
  }


  useEffect(() => {
    loadTransaction()
  }, [])
  
  useFocusEffect(useCallback(() => {
    loadTransaction()
  }, []))

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
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>


      </Header>

      <HighlightCards>
        <HighlightCard 
          title='Entradas' 
          amount={highlightData.entries?.amount} 
          lastTransaction={`Última entrada ${highlightData.entries?.lastTransaction}`}
          type='up'
        />
        <HighlightCard 
          title='Saídas' 
          amount={highlightData.expensives?.amount}
          lastTransaction={`Última saída ${highlightData.expensives?.lastTransaction}`}
          type='down'
        />
        <HighlightCard 
          title='Total' 
          amount={highlightData.total?.amount}
          lastTransaction={highlightData.total?.lastTransaction}
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