import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.primary.background};
`;

export const Text = styled.Text`
  font-size: 30px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
`;
