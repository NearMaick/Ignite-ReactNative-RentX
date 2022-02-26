import { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { Bullet } from "../Bullet";
import { Container, ImageIndexes, CarImageWrapper, CarImage } from "./styles";

interface IProps {
  imagesUrl: { id: string; photo: string }[];
}

interface IChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: IProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: IChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet key={String(item.id)} active={index === imageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode='contain' />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  );
}
