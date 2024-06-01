import "@tamagui/core/reset.css";

import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text } from "react-native";
import { TamaguiProvider, View, Button, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";
import { useFonts } from "expo-font";

// you usually export this from a tamagui.config.ts files
const tamaguiConfig = createTamagui(config);

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View style={styles.container}>
        <Button onPress={createTwoButtonAlert}>
          Open up App.js to start working on your app!
        </Button>
        <StatusBar style="auto" />
      </View>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
