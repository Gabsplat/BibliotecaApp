import { View, Text, YStack, Button, Slider, Card, XStack, Paragraph, Image, H1, H2, H3, H4, H5, H6 } from "tamagui";
import { Link, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { CardCategoria } from "../../components/CardCategoria"




export default function Test() {
  return (
    <>
      <View
        display="flex"
        flexDirection="column"
        alignContent="space-evenly"
        justifyContent="space-evenly"
        flexWrap="wrap"
        height="100%"
        borderWidth={2}>
        <Link replace href="/test" asChild>
          <Button>
            <Text>Go to test.js</Text>
          </Button>
        </Link>
        <XStack
          display="flex"
          flexDirection="row"
          alignContent="space-evenly"
          justifyContent="space-evenly"
          flexWrap="wrap"
          rowGap={20}
        >
          <CardCategoria category="categoria1" />
          <CardCategoria category="categoria2" />
          <CardCategoria category="categoria3" />
          <CardCategoria category="categoria4" />
          <CardCategoria category="categoria5" />
          <CardCategoria category="categoria6" />
        </XStack>

      </View>
    </>
  );
}

