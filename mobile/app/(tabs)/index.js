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

const libros = [
  {
    title: "Calculo 1",
    genre: "Académico",
    imageUrl:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/e1/01/e101ea251ffdeb0637fd85b4e3a70e5e.jpg",
  },
  {
    title: "PMBOK 7ª Edición",
    genre: "Referencia profesional y técnica",
    imageUrl:
      "https://opmintegral.com/wp-content/uploads/2021/07/PMBOK-7ma.-Edicion.png",
  },
  {
    title: "PMBOK 7ª Edición",
    genre: "Referencia profesional y técnica",
    imageUrl:
      "https://opmintegral.com/wp-content/uploads/2021/07/PMBOK-7ma.-Edicion.png",
  },
  {
    title: "PMBOK 7ª Edición",
    genre: "Referencia profesional y técnica",
    imageUrl:
      "https://opmintegral.com/wp-content/uploads/2021/07/PMBOK-7ma.-Edicion.png",
  },
];

export default function Page() {
  const router = useRouter();

  const [books, setBooks] = useState(null);

  useEffect(() => {
    fetch(uri + "/libros/posesion")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []); // Añadir dependencia vacía para que se ejecute solo una vez

  return (
    <ScrollView paddingLeft={20} paddingRight={20}>
      <H1 marginBottom={20}>{books && books.length}</H1>
      <H3 marginBottom={20} font>
        Libros en posesión
      </H3>
      <XStack gap="$5" flexWrap="wrap">
        {libros.map(({ title, genre, imageUrl }) => {
          return (
            <Link
              href={`/description?title=${title}&link=${imageUrl}&genre=${genre}`}
              asChild
            >
              <CardLibro
                animation="bouncy"
                width={160}
                minHeight={200}
                title={title}
                genre={genre}
                imageUrl={imageUrl}
              />
            </Link>
          );
        })}
      </XStack>
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
    </ScrollView>
  );
}

function CardLibro(props) {
  return (
    <View flex={props.flex}>
      <Card
        elevate
        // size="$4"
        bordered
        {...props}
        style={{ overflow: "hidden" }}
      >
        <Card.Background>
          <Image
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: props.imageUrl,
            }}
          />
        </Card.Background>
      </Card>
      <Paragraph size="$5" fontWeight="bold" width={props.width} pt={10}>
        {props.title}
      </Paragraph>
      <Paragraph theme="alt2">Fecha</Paragraph>
    </View>
  );
}
