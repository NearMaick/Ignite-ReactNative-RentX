import { ComponentProps } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Container } from "./styles";
import { Feather } from "@expo/vector-icons";

interface IProps extends TextInputProps {
  iconName: ComponentProps<typeof Feather>["name"];
}

export function Input({ iconName }: IProps) {
  const theme = useTheme();

  return (
    <Container>
      <Feather name={iconName} size={24} color={theme.colors.text.detail} />
    </Container>
  );
}
