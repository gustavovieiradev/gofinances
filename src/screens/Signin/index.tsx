import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import SigninSocialButton from '../../components/SigninSocialButton';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigninTitle,
  Footer,
  FooterWrapper,
} from './styles';

const Signin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (err) {
      console.error(err);
      Alert.alert('Não foi possível conectar a conta Google');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (err) {
      console.error(err);
      Alert.alert('Não foi possível conectar a conta Google');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {'\n'}finanças de forma {'\n'}muito simples
          </Title>
        </TitleWrapper>
        <SigninTitle>
          Faça seu login com {'\n'}uma das contas abaixo
        </SigninTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SigninSocialButton
            svg={GoogleSvg}
            title="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />
          <SigninSocialButton
            svg={AppleSvg}
            title="Entrar com Apple"
            onPress={handleSignInWithApple}
          />
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
};

export default Signin;
