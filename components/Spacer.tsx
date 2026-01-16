import { StyleProp, View, ViewStyle } from "react-native";

type SpacerProps = {
  height?: number;
  width?: number;
  style?: StyleProp<ViewStyle>;
};

const Spacer = ({ height, width, style }: SpacerProps) => {
  return <View style={[{ height, width }, style]} />;
};

export default Spacer;
