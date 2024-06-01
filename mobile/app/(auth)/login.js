import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  View,
  H4,
  YStack,
  Button,
  Input,
  Form,
  XStack,
  Label,
  Text,
  H2,
} from "tamagui";
import { useAuth } from "../../context/AuthContext";

export default function login() {
  const usuarioRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();

  const [testValue, setTestValue] = useState("1");

  const loginAction = () => {
    const usuario = usuarioRef.current.value;
    const password = passwordRef.current.value;

    if (
      !usuario ||
      !password ||
      usuario.length === 0 ||
      password.length === 0
    ) {
      setTestValue("Usuario o contraseña incorrectos");
      return;
    }

    login(usuario, password);
  };

  return (
    <Form
      mt="$16"
      minWidth={300}
      gap="$2"
      onSubmit={() => {
        loginAction();
      }}
      padding="$4"
      justifyContent="center"
      alignItems="center"
    >
      <H2>Login</H2>
      <Button
        onPress={() => {
          fetch(process.env.EXPO_PUBLIC_SERVER_URL + "/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
        }}
        variant="outlined"
        w="100%"
      >
        Logout
      </Button>
      <YStack width="100%" justifyContent="center">
        <Text color="red">Test: {testValue}</Text>
      </YStack>

      <YStack width="100%" alignItems="center">
        <Label>Usuario</Label>
        <Input
          w="100%"
          defaultValue=""
          placeholder="Pepito..."
          onChangeText={(e) => (usuarioRef.current.value = e)}
          ref={usuarioRef}
        />
      </YStack>
      <YStack width="100%" alignItems="center">
        <Label width={90}>Contraseña</Label>
        <Input
          w="100%"
          defaultValue=""
          placeholder="Pepito..."
          required
          secureTextEntry
          onChangeText={(e) => (passwordRef.current.value = e)}
          ref={passwordRef}
        />
      </YStack>

      <Form.Trigger asChild>
        <Button variant="outlined" w="100%">
          Login
        </Button>
      </Form.Trigger>
    </Form>
  );
}
