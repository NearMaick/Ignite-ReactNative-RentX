import { Container } from "./styles";

interface IBulletProps {
  active?: boolean;
}

export function Bullet({ active }: IBulletProps) {
  return <Container active={active} />;
}
