import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import Spacer from "@/components/Spacer";
import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { fonts } from "@/constants/fonts";
import { Colors } from "@/constants/colors";

const Onboarding = () => {


  const router = useRouter()


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
        <Pressable onPress={()=>router.replace('/dashboard/Home')}>
          <Text style={styles.button}>Get Started</Text>
        </Pressable>
      </SafeAreaViewWrapper>
    </ImageBackground>
  );
};

export default Onboarding;

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
    fontFamily: fonts.semibold,
    color: "white",
    fontSize: 32,
    textAlign: "center",
  },
  description: {
    color: Colors.grey_light,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    color: "white",
    fontFamily: fonts.semibold,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.brown_normal,
    textAlign: "center",
    marginBottom: 20,
  },
});
