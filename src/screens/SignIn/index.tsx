import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Container, Header, Form, Subtitle, Title, Footer } from "./styles";

export function SignIn() {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>Estamos{"\n"}quase lá</Title>
        <Subtitle>
          Faça seu login para começar{"\n"}uma experiência incrível
        </Subtitle>
      </Header>

      <Form>
        <Input iconName="mail" />
        <Input iconName="lock" />
      </Form>

      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button
          title="Criar conta gratuita"
          color={theme.colors.secondary.background}
          light
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
      </Footer>
    </Container>
  );
}
