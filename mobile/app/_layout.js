import { TamaguiProvider, View } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";
import { Stack } from "expo-router";
import AuthProvider, { useAuth } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </TamaguiProvider>
    </AuthProvider>
  );
}
