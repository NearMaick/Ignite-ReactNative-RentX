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
} from "./styles";
import { useState } from "react";

export function Profile() {
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");

  const theme = useTheme();
  const { goBack } = useNavigation();

  function handleBack() {
    goBack();
  }

  function handleSignOut() {}

  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    setOption(optionSelected);
  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape.main} onPress={handleBack} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogOutButton onPress={handleSignOut}>
            <Feather name='power' size={24} color={theme.colors.shape.main} />
          </LogOutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo source={{ uri: "http://github.com/nearmaick.png" }} />
          <PhotoButton onPress={() => {}}>
            <Feather name='camera' size={24} color={theme.colors.shape.main} />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content>
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
      </Content>
    </Container>
  );
}
