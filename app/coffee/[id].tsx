import { AnimatedPressable } from "@/components/animations/Reanimated";
import Navbar from "@/components/Navbar";
import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Coffee, fetchCoffeeById } from "@/lib/coffeeApi";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const CoffeeDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [coffee, setCoffee] = useState<Coffee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sizeSelected, setSizeSelected] = useState<string>("S");

  const sizes = ["S", "M", "L"];

  useEffect(() => {
    const getCoffeeDetails = async () => {
      if (!id) return;

      setLoading(true);
      const { data, error } = await fetchCoffeeById(Number(id));
      if (data) {
        setCoffee(data);
      } else {
        console.log("Error fetching coffee details:", error);
      }
      setLoading(false);
    };

    getCoffeeDetails();
  }, [id]);

  const formatTags = (tags: string[]) => {
    if (!tags || tags.length === 0) return "";
    // For "All Coffee", show tags like "tag1/tag2..."
    if (tags.length === 1) return tags[0];
    if (tags.length === 2) return `${tags[0]}/${tags[1]}`;
    return `${tags[0]}/${tags[1]}...`;
  };

  if (loading) {
    return (
      <SafeAreaViewWrapper>
        <Navbar showBackButton={true} title="Detail" showFavoriteIcon={true} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.brown_normal} />
        </View>
      </SafeAreaViewWrapper>
    );
  }

  return (
    <SafeAreaViewWrapper>
      <Navbar showBackButton={true} title="Detail" showFavoriteIcon={true} />

      {coffee && (
        <View style={styles.container}>
          <View style={styles.image_container}>
            <Image
              source={{ uri: coffee.image_url }}
              alt="Coffee Image"
              resizeMode="cover"
              style={styles.image}
            />
          </View>
          <Spacer height={16} />
          <View style={styles.short_description_container}>
            <View style={styles.name_container}>
              <View>
                <Text style={styles.name}>{coffee.name}</Text>
                <Text style={styles.tags}>{formatTags(coffee.tags)}</Text>
              </View>
              <View style={styles.rating_container}>
                <Ionicons name="star" size={20} color="#FBBE21" />
                <Text style={styles.rating}>{coffee.rating}</Text>
                <Text style={styles.purchases}>({coffee.purchases})</Text>
              </View>
            </View>

            <View></View>
          </View>

          <View style={styles.divider_line}></View>

          <View style={styles.description_container}>
            <Text style={styles.description_title}>Description</Text>
            <Text style={styles.description_content}>{coffee.description}</Text>
          </View>

          <Spacer height={24} />

          <View style={styles.sizes_container}>
            <Text style={styles.size_title}>Size</Text>
            <View style={styles.sizes_options_container}>
              {sizes.map((size, index) => (
                <AnimatedPressable
                  key={index}
                  style={[
                    styles.size_option_btn,
                    size === sizeSelected
                      ? styles.size_option_btn_selected
                      : styles.size_option_btn_unselected,
                  ]}
                  onPress={() => setSizeSelected(size)}
                >
                  <Text
                    style={[
                      styles.size_option_value,
                      size === sizeSelected
                        ? styles.size_option_value_selected
                        : styles.size_option_value_unselected,
                    ]}
                  >
                    {size}
                  </Text>
                </AnimatedPressable>
              ))}
            </View>
          </View>
        </View>
      )}

      <View></View>
    </SafeAreaViewWrapper>
  );
};

export default CoffeeDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image_container: {
    width: "100%",
    height: 202,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  short_description_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  name_container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  rating_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  name: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: Colors.grey_normal,
  },

  tags: {
    textTransform: "capitalize",
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
  },

  rating: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  purchases: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
  },

  divider_line: {
    margin: 16,
    height: 1,
    backgroundColor: Colors.grey_line,
  },

  description_container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  description_title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  description_content: {
    fontFamily: fonts.light,
    fontSize: 14,
    color: Colors.grey_light,
  },

  sizes_container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  size_title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  sizes_options_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  size_option_btn: {
    paddingVertical: 16,
    paddingHorizontal: 43,
    borderRadius: 12,
    borderWidth: 1,
  },

  size_option_btn_selected: {
    backgroundColor: Colors.brown_light,
    borderColor: Colors.brown_normal,
  },

  size_option_value: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },

  size_option_value_selected: {
    color: Colors.brown_normal,
  },

  size_option_value_unselected: {
    color: Colors.grey_normal,
  },

  size_option_btn_unselected: {
    backgroundColor: "white",
    borderColor: Colors.grey_line,
  },
});
