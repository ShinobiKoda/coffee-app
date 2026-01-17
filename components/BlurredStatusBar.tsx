import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BlurredStatusBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <BlurView
        intensity={50}
        tint="dark"
        style={[
          styles.statusBarBlur,
          {
            height:
              insets.top > 0 ? insets.top : Platform.OS === "android" ? 24 : 0,
          },
        ]}
      />
    </>
  );
};

export default BlurredStatusBar;

const styles = StyleSheet.create({
  statusBarBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});
