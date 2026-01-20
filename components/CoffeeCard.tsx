import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Coffee } from "@/lib/coffeeApi";
import { useCart } from "@/providers/CartProvider";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AnimatedPressable } from "./animations/Reanimated";

interface CoffeCardProps {
  id: number;
  image_url: string;
  name: string;
  tags: string[];
  price: number;
  description?: string;
  purchases?: number;
  rating?: number;
  selectedCategory?: string;
  handleNavigation?: (id: number) => void;
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
      (tag) => tag.toLowerCase() === selectedCategory.toLowerCase(),
    );
    return matchingTag || tags[0];
  }

  // For "All Coffee", show tags like "tag1/tag2..."
  if (tags.length === 1) return tags[0];
  if (tags.length === 2) return `${tags[0]}/${tags[1]}`;
  return `${tags[0]}/${tags[1]}...`;
};

const CoffeeCard = ({
  id,
  image_url,
  name,
  tags,
  price,
  description = "",
  purchases = 0,
  rating = 0,
  selectedCategory,
  handleNavigation,
}: CoffeCardProps) => {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    const coffee: Coffee = {
      id,
      name,
      image_url,
      tags,
      price,
      description,
      purchases,
      rating,
    };
    addToCart(coffee, "M", 1);
  };

  const inCart = isInCart(id);

  return (
    <View style={styles.container}>
      <AnimatedPressable onPress={() => handleNavigation?.(id)}>
        <View style={styles.image_container}>
          <Image
            source={{ uri: image_url }}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel={`${name} coffee image`}
          />
        </View>
      </AnimatedPressable>
      <View style={styles.description}>
        <Text style={styles.name}>{truncateName(name)}</Text>
        <Text style={styles.tag}>{formatTags(tags, selectedCategory)}</Text>
      </View>
      <View style={styles.cart}>
        <Text style={styles.price}>₦ {price}</Text>
        <AnimatedPressable
          style={[styles.add_to_cart_btn, inCart && styles.in_cart_btn]}
          onPress={handleAddToCart}
        >
          <Ionicons
            name={inCart ? "checkmark" : "add"}
            size={20}
            color="white"
          />
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

  in_cart_btn: {
    backgroundColor: "#4CAF50",
  },
});
