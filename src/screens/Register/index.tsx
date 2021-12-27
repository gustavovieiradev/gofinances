import React, { useState } from 'react';
import { Modal } from 'react-native';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import RadioButton from '../../components/Form/RadioButton';
import Select from '../../components/Select';
import CategorySelect from '../CategorySelect';
import { Container, Header, Title, Form, Fields, RadioButtonsField } from './styles';

const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const handleTransactionTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type)
  }
  

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Nome' />
          <Input placeholder='Preço' />

          <RadioButtonsField>
            <RadioButton 
              title='Incoming' 
              type='up' 
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <RadioButton 
              title='Outcome' 
              type='down' 
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </RadioButtonsField>

          <Select title={category.name} onPress={() => setCategoryModalOpen(true)} />

        </Fields>

        <Button title='Enviar' />

      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={() => setCategoryModalOpen(false)} />
      </Modal>

    </Container>
  );
}

export default Register;