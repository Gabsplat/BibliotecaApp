import { View, Text, YStack, Button } from "tamagui";
import { Link, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function Page() {
  const router = useRouter();

  return (
    <View>
      <Text>Homepage</Text>
      <Link replace href="/test" asChild>
        <Button>
          <Text>Go to user page</Text>
        </Button>
      </Link>
    </View>
  );
}
