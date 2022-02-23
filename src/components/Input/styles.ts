import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface IProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;

  margin-bottom: 8px;
`;

export const IconContainer = styled.View<IProps>`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.secondary.background};

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main.main};
    `}
`;

export const InputText = styled.TextInput<IProps>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary.background};
  color: ${({ theme }) => theme.colors.text.main};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  padding: 0 23px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main.main};
    `}
`;
