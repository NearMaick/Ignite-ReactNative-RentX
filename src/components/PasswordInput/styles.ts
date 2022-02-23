import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface IContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<IContainerProps>`
  flex-direction: row;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main.main};
    `}
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.secondary.background};
`;

export const InputText = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary.background};
  color: ${({ theme }) => theme.colors.text.main};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;
`;
