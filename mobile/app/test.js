import { Link } from "expo-router";
import { Button, Text, View } from "tamagui";

export default function Test() {
  return (
    <View>
      <Link replace href="/" asChild>
        <Button>
          <Text>Go to homepage</Text>
        </Button>
      </Link>
    </View>
  );
}
