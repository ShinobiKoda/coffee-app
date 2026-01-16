import { useFonts } from "expo-font";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function FontProvider({ children }: Props) {
  const fontsLoaded = useFonts({
    "Sora-Semibold": require("../assets/fonts/Sora/static/Sora-SemiBold.ttf"),
    "Sora-Regular": require("../assets/fonts/Sora/static/Sora-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return <>{children}</>;
}
