import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import Button from '../../components/Form/Button';
import InputForm from '../../components/Form/InputForm';
import RadioButton from '../../components/Form/RadioButton';
import Select from '../../components/Select';
import CategorySelect from '../CategorySelect';
import { Container, Header, Title, Form, Fields, RadioButtonsField } from './styles';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

interface FormData {
  amount: string;
  name: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor nao pode ser negativo')
    .required('Preço é obrigatório')
})

const Register: React.FC = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
  const {control, handleSubmit, formState} = useForm({
    resolver: yupResolver(schema)
  });

  const {errors} = formState;

  const handleTransactionTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type)
  }

  const handleRegister = ({name, amount}: FormData) => {
    if (!transactionType) {
      Alert.alert('Selecione o tipo da transação!')
      return;
    }

    if (category.key === 'category') {
      Alert.alert('Selecione a categoria')
      return;
    }

    const data = {
       name,
       amount,
       transactionType,
       category: category.key
    }

    console.log(data)
  }
  
  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <Header>
              <Title>Cadastro</Title>
            </Header>

            <Form>
              <Fields>
                <InputForm 
                  name="name"
                  control={control}
                  placeholder='Nome'
                  autoCapitalize='sentences'
                  autoCorrect={false}
                  error={errors.name && errors.name.message}
                />
                <InputForm 
                  name="amount"
                  control={control}
                  placeholder='Preço'
                  keyboardType='numeric'
                  error={errors.amount && errors.amount.message}
                />

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

              <Button title='Enviar' onPress={handleSubmit(handleRegister)} />

            </Form>

            <Modal visible={categoryModalOpen}>
              <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={() => setCategoryModalOpen(false)} />
            </Modal>

        </Container>
      </TouchableWithoutFeedback>
  );
}

export default Register;