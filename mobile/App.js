import "@tamagui/core/reset.css";

import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text } from "react-native";
import { TamaguiProvider, View, Button, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config);

export default function App() {
  const createTwoButtonAlert = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

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
