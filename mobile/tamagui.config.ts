import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

const customConfig = {
  ...config,
  defaultFont: "body",
};

export const tamaguiConfig = createTamagui(customConfig);

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
