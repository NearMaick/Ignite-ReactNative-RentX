import { FlatList, FlatListProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Car } from "../../database/model/Car";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary.background};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  background-color: ${({ theme }) => theme.colors.header};

  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  padding: 32px 24px;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text.main};
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;

export const CarsList = styled(
  FlatList as new (props: FlatListProps<Car>) => FlatList<Car>
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text.main};
  font-family: ${({ theme }) => theme.fonts.primary_400};
`;
