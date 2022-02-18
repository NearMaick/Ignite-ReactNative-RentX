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
import {
  Calendar,
  generateInterval,
  IDayProps,
  IMarkedDateProps,
} from "../../components/Calendar";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<IDayProps>(
    {} as IDayProps
  );

  const [markedDates, setMarkedDates] = useState<IMarkedDateProps>(
    {} as IMarkedDateProps
  );
  const theme = useTheme();

  const { goBack } = useNavigation();

  function handleBack() {
    goBack();
  }

  const { navigate } = useNavigation();

  function handleConfirmRental() {
    navigate("SchedulingDetails");
  }

  function handleChangeDate(date: IDayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <BackButton onPress={handleBack} color={theme.colors.shape.main} />

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

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
