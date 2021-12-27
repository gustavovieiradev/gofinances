import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
  Container,
  Title,
  Icon,
} from './styles';

interface Props extends TouchableOpacityProps {
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