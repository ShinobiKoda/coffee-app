import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

interface NavbarProps {
  title?: string;
  showBackButton?: boolean;
  showFavoriteIcon?: boolean;
}

const Navbar = ({ title, showBackButton, showFavoriteIcon }: NavbarProps) => {

  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {showBackButton && <Ionicons name="chevron-back-outline" size={24} />}
      {title && <Text style={styles.title}>{title}</Text>}
      {showFavoriteIcon && (
        <Pressable onPress={()=> setPressed(true)}>
          <Ionicons name={pressed ? "heart" : "heart-outline"} size={24} color={Colors.brown_normal}/>
        </Pressable>
      )}
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 10,
  },

  title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },
});
