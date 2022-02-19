import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { ICarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";
import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
} from "./styles";

interface ICarProps {
  id: string;
  user_id: string;
  car: ICarDTO;
}

export function MyCars() {
  const [cars, setCars] = useState<ICarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const { goBack, navigate } = useNavigation();

  function handleBack() {
    goBack();
  }

  async function fetchCars() {
    try {
      const response = await api.get("/schedules_byuser?user_id=1");
      console.log(response.data);
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

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

        <Subtitle>Conforto, segurança e praticidade</Subtitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>05</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Car data={item.car} />}
        />
      </Content>
    </Container>
  );
}
