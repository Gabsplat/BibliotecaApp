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
import { Clock10 } from "lucide-react-native";

export default function Page() {
  const [librosPosesion, setLibrosPosesion] = useState(null);
  const { user, login } = useAuth();

  useEffect(() => {
    fetch(process.env.EXPO_PUBLIC_SERVER_URL + "/biblioteca/libros/posesion")
      .then((res) => res.json())
      .then((data) => {
        console.log(librosPosesion);
        setLibrosPosesion(data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  useEffect(() => {
    login("gaabgames@gmail.com", "123");
  }, []);

  return (
    <ScrollView paddingHorizontal={20}>
      <H3 marginBottom={15} marginTop={20} fontWeight="medium">
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
      <Link href="/book?libroId=1">Go to libro</Link>
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
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: props.imageUrl || "https://picsum.photos/200/300",
            }}
          />
        </Card.Background>
      </Card>
      <Paragraph size="$5" fontWeight="bold" width={props.width} pt={10}>
        {props.titulo}
      </Paragraph>
      <XStack alignItems="center" gap={4}>
        <Clock10 color="red" size={14} />
        <Paragraph color="red" theme="alt2">
          {props.fechaDevolucion.toLocaleDateString()}
        </Paragraph>
      </XStack>
    </View>
  );
}
