import { View } from "tamagui";

export default function Separator({
  backgroundColor = "#8B4513",
  marginTop = 12,
  marginBottom = 10,
  width = "40%",
  h = 2,
  ...props
}) {
  return (
    <View
      backgroundColor={backgroundColor}
      h={h}
      marginTop={marginTop}
      marginBottom={marginBottom}
      width={width}
      {...props}
    />
  );
}
