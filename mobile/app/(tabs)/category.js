import { View, Text, YStack, Button, Slider, Card, XStack, Paragraph, Image, H1, H2, H3, H4, H5, H6 } from "tamagui";
import { Link, useRouter } from "expo-router";
import { Pressable } from "react-native";




export default function Test() {
    return (
        <>
        <View
            display="flex"
            flexDirection="row"
            alignContent="space-around"
            justifyContent="center">
            <Link replace href="/test" asChild>
            <Button>
                <Text>Go to test.js</Text>
            </Button>
            </Link>
            <Card 
                display="flex"
                flexDirection="row"
                alignContent="center"
                justifyContent="center">

            </Card>
        </View>
        </>
    );
  }