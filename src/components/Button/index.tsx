import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

interface IProps {
  title: string;
  color?: string;
  onPress: () => void;
}

export function Button({ title, color, onPress, ...rest }: IProps) {
  const theme = useTheme();

  return (
    <Container
      {...rest}
      onPress={onPress}
      color={color ? color : theme.colors.main.main}
    >
      <Title>{title}</Title>
    </Container>
  );
}
