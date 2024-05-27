import { View, Text, YStack, Button, Slider, Card, XStack, Paragraph, Image, H1, H2, H3, H4, H5, H6 } from "tamagui";
import { Link, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function Page() {
  const router = useRouter();

  return (
    <View paddingLeft={20} paddingRight={20}>
      <Text>asdas</Text>
      <Text>Pagina</Text>
      <Link replace href="/test" asChild>
        <Button>
          <Text>Go to user page</Text>
        </Button>
      </Link>
      <H3 marginBottom={20} font>Libros en Posesión</H3>
        <XStack $sm={{ flexDirection: 'row' }} space>
          <DemoCard
            animation="bouncy"
            size="$4"
            width={250}
            height={300}
            scale={0.9}
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
            title = "Calculo 1"
            imageUrl = 'https://picsum.photos/200/300'
          />
          <DemoCard size="$5" width={250} height={300} />
        </XStack>
    </View>
    
  );
}

function DemoCard(props) {
  return (
    <Link replace href="/test" asChild>
      <Card elevate size="$4" bordered {...props}>
        <Card.Header padded>
        </Card.Header>
        <Card.Footer padded flexDirection="column">
          <H2>{props.title}</H2>
          <Paragraph theme="alt2">Fecha</Paragraph>        
        </Card.Footer>
        <Card.Background>
          <Image
            resizeMode="contain"
            alignSelf="center"
            source={{
              width: 300,
              height: 300,
              uri: props.imageUrl
            }}
          />
        </Card.Background>
      </Card>
    </Link>
  )
}
