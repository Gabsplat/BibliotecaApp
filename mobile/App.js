import "@tamagui/core/reset.css";

import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text } from "react-native";
import { TamaguiProvider, View, Button, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
import tamaguiConfig from "./tamagui.config";

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Bold": require("./fonts/Inter-Bold.woff2"),
    "Inter-Medium": require("./fonts/Inter-Medium.woff2"),
    "Inter-Regular": require("./fonts/Inter-Regular.woff2"),
    "Inter-SemiBold": require("./fonts/Inter-SemiBold.woff2"),
    "Inter-Light": require("./fonts/Inter-Light.woff2"),
    unset: require("./fonts/Inter-Regular.woff2"), // default
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View style={styles.container} onLayout={onLayoutRootView}>
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
