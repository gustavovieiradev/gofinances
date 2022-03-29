import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

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
  const data = useAuth();

  console.log(data);

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
          <SigninSocialButton svg={GoogleSvg} title="Entrar com Google" />
          <SigninSocialButton svg={AppleSvg} title="Entrar com Apple" />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};

export default Signin;
