import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#111111", "#313131"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <SafeAreaViewWrapper>
          <View style={styles.location_container}>
            <Text style={styles.location_heading}>Location</Text>
            <Text style={styles.location_value}>
              Akure, Ondo State, Nigeria
            </Text>
          </View>
          <View>

          </View>
        </SafeAreaViewWrapper>
      </LinearGradient>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    height: 280,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  location_container:{
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  location_heading: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
  },
  location_value: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: "white",
  },
});
