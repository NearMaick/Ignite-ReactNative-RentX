import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { ICarDTO } from "../../dtos/CarDTO";
import { Car as ModelCar } from "../../database/model/Car";
import { AntDesign } from "@expo/vector-icons";

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
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { LoadAnimation } from "../../components/LoadAnimation";
import { format, parseISO } from "date-fns";

interface ICarProps {
  id: string;
  user_id: string;
  startDate: string;
  endDate: string;
  car: ICarDTO;
}

interface IDataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const [cars, setCars] = useState<IDataProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const { goBack, navigate } = useNavigation();

  function handleBack() {
    goBack();
  }

  async function fetchCars() {
    try {
      const response = await api.get("/rentals");
      const dataFormatted = response.data.map((data: IDataProps) => {
        return {
          id: data.id,
          car: data.car,
          start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
          end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
        };
      });
      setCars(dataFormatted);
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
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <BackButton onPress={handleBack} color={theme.colors.shape.main} />

        <Title>
          Escolha uma {"\n"} data de início e {"\n"} fim do aluguel
        </Title>

        <Subtitle>Conforto, segurança e praticidade</Subtitle>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name='arrowright'
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
