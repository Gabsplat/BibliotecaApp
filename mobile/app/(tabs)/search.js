import {
  View,
  Text,
  YStack,
  Button,
  Slider,
  Card,
  XStack,
  Paragraph,
  Image,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Stack,
} from "tamagui";
import { Link, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { CardCategoria } from "../../components/CardCategoria";
import SearchB from "../../components/SearchB";

export default function Search() {
  return (
    <>
      <View
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        height="100%"
        width="100%"
      >
        <SearchB height="75%" />
        <XStack
          display="flex"
          flexDirection="row"
          alignContent="space-evenly"
          justifyContent="space-evenly"
          flexWrap="wrap"
          rowGap={20}
        >
          <CardCategoria category="Matemática" color="#ff6961" />
          <CardCategoria category="Programación" color="#77dd77" />
          <CardCategoria category="Ingeniería" color="#fdfd96" />
          <CardCategoria category="Ciencia" color="#84b6f4" />
          <CardCategoria category="Física" color="#fdcae1" />
          <CardCategoria category="categoria6" color="#ffda9e" />
        </XStack>
      </View>
    </>
  );
}
