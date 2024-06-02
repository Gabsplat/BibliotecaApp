import {
  View,
  Text,
  Button,
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
  ScrollView,
} from "tamagui";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
// import { Timer } from '@tamagui/lucide-icons'

const uri = "https://young-bananas-show.loca.lt";

export default function Page() {
  const router = useRouter();

  const [value, setValue] = useState("Nada");

  useEffect(() => {
    fetch(uri + "/")
      .then((res) => res.json())
      .then((data) => setValue(data.message));
  }, []); // Añadir dependencia vacía para que se ejecute solo una vez

  return (
    <View paddingLeft={20} paddingRight={20}>
      <Text>{value}</Text>
      <Link replace href="/login" asChild>
        <Button>
          <Text>Go to LOGIN</Text>
        </Button>
      </Link>
      <Link replace href="/test" asChild>
        <Button>
          <Text>Go to test.js</Text>
        </Button>
      </Link>
      <H3 marginBottom={20} font>
        Libros en Posesión
      </H3>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack $sm={{ flexDirection: "row" }} space>
          <DemoCard
            animation="bouncy"
            width={150}
            height={200}
            scale={0.9}
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
            title="Calculo 1"
            genre="Académico"
            imageUrl='https://images.cdn3.buscalibre.com/fit-in/360x360/e1/01/e101ea251ffdeb0637fd85b4e3a70e5e.jpg'
          />
          <DemoCard
            animation="bouncy"
            width={150}
            height={200}
            scale={0.9}
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
            title="PMBOK 7ª Edición"
            genre="Referencia profesional y técnica"
            imageUrl='https://opmintegral.com/wp-content/uploads/2021/07/PMBOK-7ma.-Edicion.png'
          />
          <DemoCard
            animation="bouncy"
            width={150}
            height={200}
            scale={0.9}
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
            title="Redes de neuronas artificiales"
            genre="Académico"
            imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvY0QVhsZ8pNfdstM1Qe-QOoZdD3Oui26Leg&s'
          />
        </XStack>
      </ScrollView>
    </View>
  );
}

function DemoCard(props) {
  return (
    <>
      <XStack flexDirection="column">
        <Link replace href={`/description?title=${props.title}&link=${props.imageUrl}&genre=${props.genre}`} asChild>
          <Card elevate size="$4" bordered {...props} style={{ overflow: 'hidden' }}>
            <Card.Header padded>
            </Card.Header>
            <Card.Footer padded flexDirection="column">
              <H5></H5>
            </Card.Footer>
            <Card.Background>
              <Image
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
                source={{
                  uri: props.imageUrl,
                }}
              />
            </Card.Background>
          </Card>
        </Link>
        <XStack flexDirection="column">
          <H4 maxWidth={150} flexWrap="wrap">{props.title}</H4>
          <Paragraph theme="alt2">Fecha</Paragraph>
        </XStack>
      </XStack>
    </>
  );
}