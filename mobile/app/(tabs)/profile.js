import { Link } from "expo-router";
import { Button, Text, View, Avatar, XStack, H2, H5, H6 } from "tamagui";

import Separator from "../../components/Separator";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <View paddingHorizontal={20} height="100%">
      <View alignItems="center" mt="15%">
        <Avatar circular size="$10">
          <Avatar.Image
            src={`https://ui-avatars.com/api/?background=8B4513&color=fff&name=${user.nombre}&rounded=true&size=200`}
          />
          <Avatar.Fallback bc="red" />
        </Avatar>
        <H2 marginTop={20}>{user.nombre + " " + user.apellido}</H2>
        <Text marginTop={4} fontSize={20}>
          {user.legajo}
        </Text>
      </View>
      <Separator alignSelf="center" marginBottom={40} />
      <XStack display="flex" flexDirection="column" width="100%">
        <H5 marginBottom={2} fontWeight="bold">
          Correo
        </H5>
        <Text>{user.correo}</Text>
        <Separator
          marginTop={20}
          marginBottom={20}
          backgroundColor="rgba(139, 69, 19, 0.4)"
        />
        <H5 marginBottom={2} fontWeight="bold">
          Carrera
        </H5>
        <Text>{user.carrera}</Text>
      </XStack>
    </View>
  );
}
