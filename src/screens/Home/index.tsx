import { StatusBar } from "react-native";
import { CarsList, Container, Header, TotalCars } from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";

import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { ICarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";

interface INavigationProps {
  navigate: (
    screen: string,
    carObject: {
      car: ICarDTO;
    }
  ) => void;
}

export function Home() {
  const { navigate } = useNavigation<INavigationProps>();

  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetails(car: ICarDTO) {
    navigate("CarDetails", { car });
  }

  async function fetchCars() {
    try {
      setLoading(true);
      const response = await api.get("/cars");
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
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <TotalCars>Total de 12 carros</TotalCars>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarsList
          data={cars}
          keyExtractor={(item: ICarDTO) => item.id}
          renderItem={({ item }) => (
            <Car
              data={item}
              onPress={() => {
                handleCarDetails(item);
              }}
            />
          )}
        />
      )}
    </Container>
  );
}
