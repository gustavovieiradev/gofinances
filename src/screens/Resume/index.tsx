import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import HistoryCard from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import { Container, Header, Title, Content } from './styles';

interface TransactionData {
  type: 'positive' |  'negative'
  name: string;
  amount: string;
  category: string; 
  date: string;
}

interface CategoryData {
  name: string;
  total: string;
  color: string;
  key: string;
}

const Resume: React.FC = () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  const loadData = async () => {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);

    const responseFormatted = response ? JSON.parse(response) : []

    const expensives: TransactionData[] = responseFormatted.filter((expensive: TransactionData) => expensive.type === 'negative')

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach(expensive => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      })

      if (categorySum > 0) {
        totalByCategory.push({
          key: category.key,
          color: category.color,
          name: category.name,
          total: Number(categorySum).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })
        })
      }

    })
    setTotalByCategories(totalByCategory)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {totalByCategories.length > 0 && totalByCategories.map(category => (
          <HistoryCard 
            key={category.key}
            title={category.name}
            amount={category.total}
            color={category.color}
          />
        ))}
      </Content>



    </Container>
  );
}

export default Resume;