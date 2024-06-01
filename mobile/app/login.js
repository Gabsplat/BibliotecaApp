import React from "react";
import { View, H4, YStack, Button, Input, Form } from "tamagui";

export default function login() {
  return (
    <YStack alignItems="center">
      <H4>Login</H4>
      <Form
        alignItems="center"
        gap="$2"
        width="100%"
        onSubmit={() => setStatus("submitting")}
        borderWidth={1}
        padding="$2"
      >
        <Input flex="1" />

        <Form.Trigger asChild>
          <Button>Login</Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
}
