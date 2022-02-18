import { StatusBar } from "react-native";
import { CarsList, Container, Header, TotalCars, MyCarsButton } from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { ICarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";
import { useTheme } from "styled-components";

interface INavigationProps {
  navigate: (
    screen: string,
    carObject?: {
      car: ICarDTO;
    }
  ) => void;
}

export function Home() {
  const { navigate } = useNavigation<INavigationProps>();
  const theme = useTheme();

  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetails(car: ICarDTO) {
    navigate("CarDetails", { car });
  }

  function handleUpdateMyCars() {
    navigate("MyCars");
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

      <MyCarsButton onPress={handleUpdateMyCars}>
        <Ionicons
          size={32}
          color={theme.colors.shape.main}
          name="ios-car-sport"
        />
      </MyCarsButton>
    </Container>
  );
}
