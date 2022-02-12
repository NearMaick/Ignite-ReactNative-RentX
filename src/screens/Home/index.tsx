import { StatusBar } from "react-native";
import { Container, Header, TotalCars } from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";

export function Home() {
  const carData = {
    brand: "Audi",
    name: "RS 5 Coupé",
    rent: {
      period: "ao dia",
      price: 120,
    },
    thumbnail: "https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png",
  };

  const carDataTwo = {
    brand: "Porche",
    name: "Panamera",
    rent: {
      period: "ao dia",
      price: 120,
    },
    thumbnail:
      "https://www.pngkit.com/png/full/237-2375888_porche-panamera-s.png",
  };

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

      <Car data={carData} />
      <Car data={carDataTwo} />
    </Container>
  );
}
