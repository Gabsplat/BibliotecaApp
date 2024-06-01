import { Link } from "expo-router";
import { Button, Text, View, Avatar, XStack, H2, H6 } from "tamagui";

export default function Test() {
  return (
    <View alignItems="center">
      <Link replace href="/" asChild>
        <Button>
          <Text>Go to homepage</Text>
        </Button>
      </Link>
      <Link replace href="/category" asChild>
        <Button>
          <Text>Go to category</Text>
        </Button>
      </Link>
      <Link replace href="/description" asChild>
        <Button>
          <Text>Go to description</Text>
        </Button>
      </Link>
      <Avatar circular size="$10">
        <Avatar.Image src="http://picsum.photos/200/300" />
        <Avatar.Fallback bc="red" />
      </Avatar>
      <H2 marginTop={20}>Nombre + Apellido</H2>
      <Text marginTop={20} fontSize={20}>Legajo</Text>
      <XStack display="flex"
        flexDirection="column"
        padding={30}
        width="100%"
      >
        <H6 marginBottom={10} fontWeight={800}>Correo</H6>
        <Text marginBottom={10}>correoelectronico@gmail.com</Text>
        <H6 marginBottom={10}>Carrera</H6>
        <Text marginBottom={10}>Lic. en Informática y desarrollo de software</Text>
      </XStack>
    </View>
  );
}




export function AvatarDemo() {
  return (
    <XStack alignItems="center" space="$6">
      <Avatar circular size="$10">
        <Avatar.Image
          accessibilityLabel="Cam"
          src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
        />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>

      <Avatar circular size="$8">
        <Avatar.Image
          accessibilityLabel="Nate Wienert"
          src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
        />
        <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
      </Avatar>
    </XStack>
  )
}