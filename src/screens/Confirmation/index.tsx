import { Container, Content, Title, Message, Footer } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { StatusBar, useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation, useRoute } from "@react-navigation/native";

interface IParams {
  title: string;
  message: string;
  nextScreenRoute: undefined;
}

export function Confirmation() {
  const { width } = useWindowDimensions();
  const { params } = useRoute();
  const { navigate } = useNavigation();

  const { title, message, nextScreenRoute } = params as IParams;

  function handleConfirm() {
    navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title='OK' onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
