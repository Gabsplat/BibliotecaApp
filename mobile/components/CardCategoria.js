import { Text, Card } from "tamagui";

export function CardCategoria(props) {
  return (
    <Card
      display="flex"
      flexDirection="column"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      width={150}
      height={165}
    >
      <Text>{props.category}</Text>
    </Card>
  )
}