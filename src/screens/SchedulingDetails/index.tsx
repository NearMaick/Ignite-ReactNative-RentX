import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import { Feather } from "@expo/vector-icons";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import {
  Accessories,
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ICarDTO } from "../../dtos/CarDTO";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { api } from "../../services/api";
import { Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

interface IParams {
  car: ICarDTO;
  dates: string[];
}

interface IRentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [carUpdated, setCarUpdated] = useState<ICarDTO>({} as ICarDTO);
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>(
    {} as IRentalPeriod
  );

  const netInfo = useNetInfo();

  const theme = useTheme();
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute();
  const { car, dates } = params as IParams;

  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    setLoading(true);

    await api
      .post("rentals", {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      })
      .then(() =>
        navigate("Confirmation", {
          nextScreenRoute: "Home",
          title: "Carro alugado!",
          message: `Agora só precisa ir\naté a agência da RENTX\npegar seu automóvel.`,
        })
      )
      .catch((error) => {
        setLoading(false);
        Alert.alert("ERRO", "Não foi possível confirmar o agendamento!");
        console.log(error);
      });
  }

  function handleBack() {
    goBack();
  }

  async function fetchCarUpdated() {
    const { data } = await api.get(`/cars/${car.id}`);
    setCarUpdated(data);
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });

    netInfo.isConnected === true && fetchCarUpdated();
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape.main}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(24)}
            color={theme.colors.shape.main}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x ${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title='Alugar agora'
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
