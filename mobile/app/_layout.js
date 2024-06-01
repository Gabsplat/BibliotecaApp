import { TamaguiProvider, View } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TamaguiProvider>
  );
}
