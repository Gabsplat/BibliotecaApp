import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { YStack, Button, Input, Form, Label, H2 } from "tamagui";
import { useAuth } from "../../context/AuthContext";
import { StyleSheet, TextInput } from "react-native";

export default function Login() {
  const usuarioRef = useRef(null);
  const passwordRef = useRef(null);

  const { login, user } = useAuth();

  const loginAction = () => {
    const usuario = usuarioRef.current.value;
    const password = passwordRef.current.value;

    if (
      !usuario ||
      !password ||
      usuario.length === 0 ||
      password.length === 0
    ) {
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
      <H2>Iniciar sesión</H2>
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
      <YStack width="100%" justifyContent="center"></YStack>

      <YStack width="100%" alignItems="center">
        <Label>Usuario</Label>
        <TextInput
          style={styles.input}
          defaultValue=""
          placeholder="Pepito..."
          onChangeText={(e) => (usuarioRef.current.value = e)}
          ref={usuarioRef}
        />
      </YStack>
      <YStack width="100%" alignItems="center">
        <Label width={90}>Contraseña</Label>
        <TextInput
          style={styles.input}
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

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderColor: "rgba(24,24,24,0.1)",
    borderWidth: 1,
    paddingLeft: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
});
