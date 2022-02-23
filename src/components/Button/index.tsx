import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

interface IProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: IProps) {
  const theme = useTheme();

  return (
    <Container
      {...rest}
      onPress={onPress}
      color={color ? color : theme.colors.main.main}
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape.main} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
