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
} from "./styles";

export function Profile() {
  const theme = useTheme();
  const { goBack } = useNavigation();

  function handleBack() {
    goBack();
  }

  function handleSignOut() {}

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
    </Container>
  );
}
