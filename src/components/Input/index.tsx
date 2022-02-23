import { ComponentProps, useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, IconContainer, InputText } from "./styles";
import { Feather } from "@expo/vector-icons";

interface IProps extends TextInputProps {
  iconName: ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function Input({ iconName, value, ...rest }: IProps) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled
              ? theme.colors.main.main
              : theme.colors.text.detail
          }
        />
      </IconContainer>

      <InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </Container>
  );
}
