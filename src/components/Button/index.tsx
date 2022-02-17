import { Container, Title } from "./styles";

interface IProps {
  title: string;
  color?: string;
}

export function Button({ title, color, ...rest }: IProps) {
  return (
    <Container {...rest} color={color}>
      <Title>{title}</Title>
    </Container>
  );
}
