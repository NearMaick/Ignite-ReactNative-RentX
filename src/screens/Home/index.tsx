import { StatusBar } from "react-native";
import { CarsList, Container, Header, TotalCars } from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const { navigate } = useNavigation();

  const carData = [
    {
      id: "1",
      brand: "Audi",
      name: "RS 5 Coupé",
      rent: {
        period: "ao dia",
        price: 120,
      },
      thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
    },
    {
      id: "2",
      brand: "Porche",
      name: "Panamera",
      rent: {
        period: "ao dia",
        price: 120,
      },
      thumbnail:
        "https://www.pngkit.com/png/full/237-2375888_porche-panamera-s.png",
    },
  ];

  function handleCarDetails() {
    navigate("CarDetails");
  }

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

      <CarsList
        data={carData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Car data={item} onPress={handleCarDetails} />
        )}
      />
    </Container>
  );
}
