import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import HistoryCard from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { VictoryPie } from "victory-native";
import { Container, Header, Title, Content, ChartContainer, MonthSelect, Month, MonthSelectButton, MonthSelectIcon, LoadingContainer, } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths } from 'date-fns/esm';
import { format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface TransactionData {
  type: 'positive' |  'negative'
  name: string;
  amount: string;
  category: string; 
  date: string;
}

interface CategoryData {
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  key: string;
  percent: string;
}

const Resume: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (action: 'next' | 'prev') => {
    if (action === 'next') {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
      console.log(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
      console.log(newDate);
    }   
  }

  const loadData = async () => {
    setIsLoading(true)
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);

    const responseFormatted = response ? JSON.parse(response) : []

    const expensives: TransactionData[] = responseFormatted.filter((expensive: TransactionData) => expensive.type === 'negative' && new Date(expensive.date).getMonth() === selectedDate.getMonth() && new Date(expensive.date).getFullYear() && selectedDate.getFullYear())

    const expensivesTotal = expensives.reduce((acumulattor: number, expensive: TransactionData) => {
      return acumulattor + Number(expensive.amount)
    }, 0 )

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach(expensive => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      })

      const percent = `${(categorySum/expensivesTotal *100).toFixed(0)}%`;

      if (categorySum > 0) {
        totalByCategory.push({
          key: category.key,
          color: category.color,
          name: category.name,
          total: Number(categorySum),
          totalFormatted: Number(categorySum).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          percent,
        })
      }

    })  
    setTotalByCategories(totalByCategory)

    setIsLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <Title>Resumo por categoria</Title>
          </Header>

          <Content contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: useBottomTabBarHeight() }} showsVerticalScrollIndicator={false}>

            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>
              <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>
              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie 
                data={totalByCategories}
                x="percent"
                colorScale={totalByCategories.map(({color}) => color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape,
                  }
                }}
                labelRadius={50}
                y="total"
              />
            </ChartContainer>

            {totalByCategories.length > 0 && totalByCategories.map(category => (
              <HistoryCard 
                key={category.key}
                title={category.name}
                amount={category.totalFormatted}
                color={category.color}
              />
            ))}
          </Content>
        </>
      )}
      



    </Container>
  );
}

export default Resume;