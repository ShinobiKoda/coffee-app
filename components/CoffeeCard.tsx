import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedPressable } from "./animations/Reanimated";

interface CoffeCardProps {
  image_url: string;
  name: string;
  tags: string[];
  price: number;
  selectedCategory?: string;
}

const truncateName = (name: string, maxWords: number = 2): string => {
  const words = name.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return name;
};

const formatTags = (tags: string[], selectedCategory?: string): string => {
  if (!tags || tags.length === 0) return "";
  
  // If a specific category is selected (not "All Coffee"), show only that tag
  if (selectedCategory && selectedCategory !== "All Coffee") {
    const matchingTag = tags.find(
      (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
    );
    return matchingTag || tags[0];
  }
  
  // For "All Coffee", show tags like "tag1/tag2..."
  if (tags.length === 1) return tags[0];
  if (tags.length === 2) return `${tags[0]}/${tags[1]}`;
  return `${tags[0]}/${tags[1]}...`;
};

const CoffeeCard = ({ image_url, name, tags, price, selectedCategory }: CoffeCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image
          source={{ uri: image_url }}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={`${name} coffee image`}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.name}>{truncateName(name)}</Text>
        <Text style={styles.tag}>{formatTags(tags, selectedCategory)}</Text>
      </View>
      <View style={styles.cart}>
        <Text style={styles.price}>$ {price}</Text>
        <AnimatedPressable style={styles.add_to_cart_btn}>
          <Ionicons name="add" size={20} color="white" />
        </AnimatedPressable>
      </View>
    </View>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: 156,
    minHeight: 238,
    borderRadius: 16,
  },

  image_container: {
    borderRadius: 12,
    height: 140,
    width: "100%",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  description: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  name: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  tag: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
    textTransform: "capitalize",
  },

  cart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  price: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: Colors.grey_dark,
  },

  add_to_cart_btn: {
    height: 32,
    width: 32,
    backgroundColor: Colors.brown_normal,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});