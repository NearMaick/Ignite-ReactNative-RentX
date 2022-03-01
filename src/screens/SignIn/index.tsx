import { useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from "react-native";
import * as Yup from "yup";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { Container, Header, Form, Subtitle, Title, Footer } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

import { database } from "../../database";

export function SignIn() {
  const theme = useTheme();
  const { navigate } = useNavigation();

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha é obrigatória"),
      });

      await schema.validate({ email, password });
      signIn({ email, password });
      Alert.alert("Tudo certo");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa!", error.message);
      } else {
        Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer login, verifique as credenciais"
        );
      }
    }
  }

  function handleNewAccount() {
    navigate("SignUpFirstStep");
  }

  useEffect(() => {
    async function loadData() {
      const usersCollection = database.get("users");
      const user = await usersCollection.query().fetch();
      console.log(user);
    }
    loadData();
  }, []);

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
            translucent
          />
          <Header>
            <Title>Estamos{"\n"}quase lá</Title>
            <Subtitle>
              Faça seu login para começar{"\n"}uma experiência incrível
            </Subtitle>
          </Header>

          <Form>
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={(value) => setEmail(value)}
              value={email}
            />

            <PasswordInput
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title='Login'
              onPress={handleSignIn}
              enabled
              loading={false}
            />
            <Button
              title='Criar conta gratuita'
              color={theme.colors.secondary.background}
              light
              onPress={handleNewAccount}
              enabled
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
