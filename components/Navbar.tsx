import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Coffee } from "@/lib/coffeeApi";
import { useFavorites } from "@/providers/FavoritesProvider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AnimatedPressable } from "./animations/Reanimated";

interface NavbarProps {
  title?: string;
  showBackButton?: boolean;
  showFavoriteIcon?: boolean;
  coffee?: Coffee | null;
}

const Navbar = ({
  title,
  showBackButton,
  showFavoriteIcon,
  coffee,
}: NavbarProps) => {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isCurrentFavorite = coffee ? isFavorite(coffee.id) : false;

  const handleFavoritePress = () => {
    if (coffee) {
      toggleFavorite(coffee);
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Section - fixed width */}
      <View style={styles.leftSection}>
        {showBackButton && (
          <AnimatedPressable onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={24} />
          </AnimatedPressable>
        )}
      </View>

      {/* Center Section - title always centered */}
      <View style={styles.centerSection}>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      {/* Right Section - fixed width (same as left for balance) */}
      <View style={styles.rightSection}>
        {showFavoriteIcon && (
          <Pressable onPress={handleFavoritePress}>
            <Ionicons
              name={isCurrentFavorite ? "heart" : "heart-outline"}
              size={24}
              color={Colors.brown_normal}
            />
          </Pressable>
        )}
      </View>
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

  leftSection: {
    width: 40,
    alignItems: "flex-start",
  },

  centerSection: {
    flex: 1,
    alignItems: "center",
  },

  rightSection: {
    width: 40,
    alignItems: "flex-end",
  },

  title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },
});
