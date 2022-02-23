import { ComponentProps, useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, IconContainer, InputText } from "./styles";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

interface IProps extends TextInputProps {
  iconName: ComponentProps<typeof Feather>["name"];
}

export function PasswordInput({ iconName, ...rest }: IProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text.detail} />
      </IconContainer>

      <InputText {...rest} secureTextEntry={isPasswordVisible} />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
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
