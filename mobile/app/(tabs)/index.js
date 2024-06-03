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
import { useAuth } from "../../context/AuthContext";
import { Clock10 } from "@tamagui/lucide-icons";
// import { Timer } from '@tamagui/lucide-icons'

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
  const [librosPosesion, setLibrosPosesion] = useState(null);
  const { user, login } = useAuth();

  useEffect(() => {
    fetch(process.env.EXPO_PUBLIC_SERVER_URL + "/biblioteca/libros/posesion")
      .then((res) => res.json())
      .then((data) => {
        setLibrosPosesion(data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  useEffect(() => {
    login("gaabgames@gmail.com", "123");
  }, []);

  return (
    <ScrollView paddingLeft={20} paddingRight={20}>
      <H3 marginBottom={20} font>
        Libros en posesión
      </H3>
      <XStack gap="$5" flexWrap="wrap">
        {librosPosesion &&
          librosPosesion.map(({ titulo, fecha_prestamo: fechaPrestamo }) => {
            const fechaPrestamoParsed = new Date(fechaPrestamo);
            const fechaDevolucion = new Date(fechaPrestamoParsed);

            fechaDevolucion.setDate(fechaDevolucion.getDate() + 7);
            console.log("Fecha prestamo: ", fechaPrestamoParsed);
            console.log(fechaDevolucion);

            return (
              <Link href={`/description?title=${titulo}`} asChild>
                <>
                  <CardLibro
                    animation="bouncy"
                    width={160}
                    minHeight={200}
                    titulo={titulo}
                    fechaDevolucion={fechaDevolucion}
                  />
                </>
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
        {props.titulo}
      </Paragraph>
      <View>
        <Clock10 size="$2" />
        <Paragraph color="red" theme="alt2">
          Devolución: {props.fechaDevolucion.toLocaleDateString()}
        </Paragraph>
      </View>
    </View>
  );
}
