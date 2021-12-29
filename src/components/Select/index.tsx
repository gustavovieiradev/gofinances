import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { 
  Container,
  Title,
  Icon,
} from './styles';

interface Props extends RectButtonProps {
  title: string;
}

const Select: React.FC<Props> = ({title, ...rest}) => {
  return (
    <Container {...rest} activeOpacity={0.7}>
      <Title>{title}</Title>
      <Icon name="chevron-down" />
    </Container>
  );
}

export default Select;