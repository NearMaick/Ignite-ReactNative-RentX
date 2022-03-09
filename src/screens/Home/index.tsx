import { StatusBar } from "react-native";
import { CarsList, Container, Header, TotalCars } from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../database";
import { Car as ModelCar } from "../../database/model/Car";

import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { LoadAnimation } from "../../components/LoadAnimation";

interface INavigationProps {
  navigate: (
    screen: string,
    carObject?: {
      car: ModelCar;
    }
  ) => void;
}

export function Home() {
  const { navigate } = useNavigation<INavigationProps>();
  const netInfo = useNetInfo();

  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  let isMounted: boolean;

  function handleCarDetails(car: ModelCar) {
    navigate("CarDetails", { car });
  }

  async function fetchCars() {
    try {
      setLoading(true);

      const carCollection = database.get<ModelCar>("cars");
      const cars = await carCollection.query().fetch();

      isMounted && setCars(cars);
    } catch (error) {
      console.log(error);
    } finally {
      isMounted && setLoading(false);
    }
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, latestVersion } = data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post("/users/sync", user).catch(console.log);
      },
    });
  }

  useEffect(() => {
    isMounted = true;
    fetchCars();

    if (netInfo.isConnected) {
      offlineSynchronize();
    }

    return () => {
      isMounted = false;
    };
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
          keyExtractor={(item: ModelCar) => item.id}
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
