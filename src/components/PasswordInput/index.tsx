import { ComponentProps, useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, IconContainer, InputText } from "./styles";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

interface IProps extends TextInputProps {
  iconName: ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: IProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

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
        {...rest}
        secureTextEntry={isPasswordVisible}
        isFocused={isFocused}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text.detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
