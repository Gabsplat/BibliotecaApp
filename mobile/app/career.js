import {
  View,
  Text,
  Button,
  H1,
  Separator
} from "tamagui";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";


export default function Page() {
  return (
    <>
      <View display="flex"
        flexDirection="column"
        alignContent="center"
        alignItems="center"
        justifyContent="center">
        <Link replace href="/test" asChild>
          <Button>
            <Text>Go to test.js</Text>
          </Button>
        </Link>
        <H1>Nombre de carrera</H1>
        <Separator borderWidth={2} borderStyle="solid" alignSelf="stretch" vertical marginHorizontal={15}></Separator>

      </View>
    </>
  )
}
