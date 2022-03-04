import { Alert, StatusBar } from "react-native";
import { CarsList, Container, Header, TotalCars } from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";

import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { ICarDTO } from "../../dtos/CarDTO";
import { LoadAnimation } from "../../components/LoadAnimation";

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
  const netInfo = useNetInfo();

  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetails(car: ICarDTO) {
    navigate("CarDetails", { car });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        setLoading(true);
        const response = await api.get("/cars");
        isMounted && setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setLoading(false);
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      Alert.alert("Está on");
    } else {
      Alert.alert("Está off");
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
      </Header>
      {loading ? (
        <LoadAnimation />
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
