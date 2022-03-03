import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { BackButton } from "../../components/BackButton";
import {
  Container,
  Header,
  HeaderTitle,
  HeaderTop,
  LogOutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";
import { useState } from "react";
import { Input } from "../../components/Input";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";

export function Profile() {
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");

  const theme = useTheme();
  const { goBack } = useNavigation();

  const { user } = useAuth();

  function handleBack() {
    goBack();
  }

  function handleSignOut() {}

  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    setOption(optionSelected);
  }

  return (
    <KeyboardAvoidingView behavior='position'>
      <TouchableWithoutFeedback>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape.main}
                onPress={handleBack}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogOutButton onPress={handleSignOut}>
                <Feather
                  name='power'
                  size={24}
                  color={theme.colors.shape.main}
                />
              </LogOutButton>
            </HeaderTop>

            <PhotoContainer>
              <Photo source={{ uri: "http://github.com/nearmaick.png" }} />
              <PhotoButton onPress={() => {}}>
                <Feather
                  name='camera'
                  size={24}
                  color={theme.colors.shape.main}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleOptionChange("dataEdit")}>
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => handleOptionChange("passwordEdit")}>
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  defaultValue={user.name}
                />
                <Input
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  defaultValue={user.driver_license}
                />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName='lock' placeholder='Senha atual' />
                <PasswordInput iconName='lock' placeholder='Nova atual' />
                <PasswordInput iconName='lock' placeholder='Repetir senha' />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
