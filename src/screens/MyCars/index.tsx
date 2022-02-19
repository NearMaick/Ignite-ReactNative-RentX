import { useEffect, useState } from "react";
import { ICarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";
import { Container } from "./styles";

export function MyCars() {
  const [cars, setCars] = useState<ICarDTO[]>([]);
  const [loading, setLoading] = useState(true);

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

  return <Container></Container>;
}
