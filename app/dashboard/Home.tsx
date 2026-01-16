import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Home = () => {
  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
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
            <Spacer height={24} />
            <View style={styles.search_container}>
              <View style={styles.searchbar}>
                <Ionicons size={20} name="search" color="white" />
                <TextInput
                  placeholder="Search Coffee"
                  keyboardType="default"
                  placeholderTextColor={Colors.grey_light}
                  style={styles.input_field}
                />
              </View>
              <View style={styles.filter_button}>
                <Ionicons name="filter-outline" size={20} color={"white"} />
              </View>
            </View>

            <Spacer height={24}/>

            <View style={styles.banner_container}>
              <ImageBackground
                source={require("../../assets/images/home-banner.png")}
                style={styles.banner_img}
              >
                <Text style={styles.promo_text}>Promo</Text>
                <Text style={styles.promo_value}>Buy one get one FREE</Text>
              </ImageBackground>
            </View>
          </SafeAreaViewWrapper>
        </LinearGradient>
      </View>
    </Pressable>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    height: 280,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  location_container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
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
  search_container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  searchbar: {
    backgroundColor: Colors.grey_normal,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  input_field: {
    color: Colors.grey_light,
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    padding: 0,
    margin: 0,
  },
  filter_button: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.brown_normal,
    borderRadius: 12,
  },
  banner_container: {
    borderRadius: 16,
    minHeight: 160,
    overflow: "hidden"
  },
  banner_img: {
    paddingHorizontal: 24,
    paddingVertical: 13,
    flex: 1,
  },
  promo_text:{
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: Colors.promo_red,
    borderRadius: 8,
    color: "white",
    fontFamily: fonts.semibold,
    fontSize: 14,
    maxWidth: 70
  },
  promo_value:{
    fontFamily: fonts.semibold,
    color: "white",
    fontSize: 32
    }
});
