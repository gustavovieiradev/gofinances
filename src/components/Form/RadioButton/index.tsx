import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { 
  Container,
  Icon,
  Title,
} from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

interface Props extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

const RadioButton: React.FC<Props> = ({title, type, isActive, ...rest}) => {
  return (
    <Container {...rest} isActive={isActive} type={type}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}

export default RadioButton;