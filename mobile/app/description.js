import {
  View,
  Text,
  Button,
  XStack,
  Image,
  H2,
} from "tamagui";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { title } = useLocalSearchParams();
  const { link } = useLocalSearchParams();
  const { genre } = useLocalSearchParams();

  return (
    <View
      padding={30}
      display="flex"
      flexDirection="column"
      height="100%"
    >
      <Link replace href="/" asChild>
        <Button>
          <Text>Go to homepage</Text>
        </Button>
      </Link>
      <XStack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        height="40%"
      >
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            uri: link // Asegúrate de acceder a params.link
          }}
          width="50%"
          height="100%"
        />
        <XStack
          width="45%"
          height="100%"
          flexDirection="column"
        >
          <H2>{title}</H2>
          <Text>{genre}</Text>
        </XStack>
      </XStack>
      <XStack height="auto">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mollis ornare dolor, volutpat finibus ligula efficitur eu. Curabitur porttitor pellentesque odio, et consectetur risus sagittis vitae. Aenean placerat, ex eu pellentesque accumsan, metus turpis ornare eros, eu egestas turpis nulla vel dolor. In vestibulum, ex rhoncus cursus facilisis, lorem metus imperdiet urna, ut cursus nibh est ut tortor. Curabitur eu augue non lorem elementum lacinia. Integer ut pellentesque dolor, at accumsan lacus. Sed placerat velit felis, sit amet blandit dui pulvinar at. Donec pellentesque ex ut felis congue faucibus. Cras eget justo in nisi iaculis auctor.
        </Text>
      </XStack>
    </View>
  );
}