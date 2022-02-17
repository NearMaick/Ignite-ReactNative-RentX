import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { StatusBar } from "react-native";
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateTitle,
  DateValue,
  DateInfo,
  Content,
  Footer,
} from "./styles";

import ArrowSvg from "../../assets/arrow.svg";
import { Button } from "../../components/Button";

export function Scheduling() {
  const theme = useTheme();

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <BackButton onPress={() => {}} color={theme.colors.shape.main} />

        <Title>
          Escolha uma {"\n"} data de início e {"\n"} fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected>17/02/2022</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false} />
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content></Content>
      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
}
