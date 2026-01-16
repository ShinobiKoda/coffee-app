import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SafeAreaViewWrapperProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const SafeAreaViewWrapper = ({ children, style }: SafeAreaViewWrapperProps) => {
  return <SafeAreaView style={[{ flex: 1 }, style]}>{children}</SafeAreaView>;
};

export default SafeAreaViewWrapper;
