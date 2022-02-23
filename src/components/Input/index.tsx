import { ComponentProps } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, IconContainer, InputText } from "./styles";
import { Feather } from "@expo/vector-icons";

interface IProps extends TextInputProps {
  iconName: ComponentProps<typeof Feather>["name"];
}

export function Input({ iconName, ...rest }: IProps) {
  const theme = useTheme();

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text.detail} />
      </IconContainer>

      <InputText {...rest} />
    </Container>
  );
}
