import {
  View,
  Text,
  Button,
  XStack,
  Image,
  H2,
  Spinner,
  SizableText,
  YStack,
  H3,
} from "tamagui";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function Book() {
  const [book, setBook] = useState(null);

  const { libroId } = useLocalSearchParams();

  useEffect(() => {
    console.log("Fetching book: ", libroId);
    fetch(process.env.EXPO_PUBLIC_SERVER_URL + "/biblioteca/libro/" + libroId)
      .then((res) => res.json())
      .then((data) => {
        setBook(data[0]);
      });
  }, [libroId]);

  return (
    <View padding={30} display="flex" flexDirection="column" height="100%">
      {!book ? (
        <>
          <Spinner size="small" color="$green10" />
        </>
      ) : (
        <>
          <YStack display="flex" justifyContent="space-between" height="40%">
            <Image
              objectFit="contain"
              alignSelf="center"
              borderRadius={10}
              source={{
                uri: "https://fastly.picsum.photos/id/30/200/300.jpg?hmac=qOyV_daSIK2KgaEj7CZYTR3n4xgqMNwskTxH7QMVGfg", // Asegúrate de acceder a params.link
              }}
              width="100%"
              height="$16"
            />
            <YStack mt={20} height="100%" flexDirection="column">
              <View>
                <XStack justifyContent="space-between" alignItems="center">
                  <H3>{book.titulo}</H3>
                  <Text fontSize="$5">{book.autor}</Text>
                </XStack>
                <Text fontSize="$4" mt={20}>
                  <Text fontWeight="bold">Género</Text>: {book.genero}
                </Text>
              </View>
              <Text mt={30}>{book.descripcion}</Text>
            </YStack>
          </YStack>
        </>
      )}
    </View>
  );
}
