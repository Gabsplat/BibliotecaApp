import { Text, Card, H4 } from "tamagui";

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
      backgroundColor={props.color}
      elevation={4}
    >
      <H4
        wordWrap="wrap"
        textAlign="center">{props.category}</H4>
    </Card>
  )
}


// const styles = StyleSheet.create({
//   cardShadow: {
//     boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
//   },
// });