import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import Spacer from "@/components/Spacer";
import { useFonts } from "expo-font";
import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const HomePage = () => {
  const fontsLoaded = useFonts({
    "Sora-Semibold": require("../assets/fonts/Sora/static/Sora-SemiBold.ttf"),
    "Sora-Regular": require("../assets/fonts/Sora/static/Sora-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../assets/images/image-onboarding.png")}
      style={styles.background}
    >
      <SafeAreaViewWrapper style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Fall in Love with Coffee in Blissful Delight!
          </Text>
          <Text style={styles.description}>
            Welcome to our cozy coffee corner, where every cup is delightful for
            you.
          </Text>
        </View>
        <Spacer height={32} />
        <Pressable onPress={()=>console.log("clicked")}>
          <Text style={styles.button}>Get Started</Text>
        </Pressable>
      </SafeAreaViewWrapper>
    </ImageBackground>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  title: {
    fontFamily: "Sora-Semibold",
    color: "white",
    fontSize: 32,
    textAlign: "center",
  },
  description: {
    color: "#A2A2A2",
    fontFamily: "Sora-Regular",
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    color: "white",
    fontFamily: "Sora-Semibold",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#C67C4E",
    textAlign: "center",
    marginBottom: 20,
  },
});
