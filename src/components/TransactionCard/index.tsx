import React from 'react';
import { categories } from '../../utils/categories';

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

export interface TransactionDataProps {
  type: 'positive' |  'negative'
  name: string;
  amount: string;
  category: string; 
  date: string;
}

interface Props {
  data: TransactionDataProps;
}

const TransactionCard: React.FC<Props> = ({data}) => {

  const category = categories.find(item => item.key === data.category)

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type} >
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category?.icon} />
          <CategoryName>{category?.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}

export default TransactionCard;