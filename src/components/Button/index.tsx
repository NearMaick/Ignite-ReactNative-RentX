import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

interface IProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  ...rest
}: IProps) {
  const theme = useTheme();

  return (
    <Container
      {...rest}
      onPress={onPress}
      color={color ? color : theme.colors.main.main}
      enabled={enabled}
      style={{ opacity: enabled ? 1 : 0.5 }}
    >
      <Title>{title}</Title>
    </Container>
  );
}
