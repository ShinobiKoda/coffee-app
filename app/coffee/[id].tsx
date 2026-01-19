import {
  AnimatedPressable,
  FadeInView,
  FadeSlideInView,
  StaggeredItem,
} from "@/components/animations/Reanimated";
import Navbar from "@/components/Navbar";
import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Coffee, fetchCoffeeById } from "@/lib/coffeeApi";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View, ScrollView } from "react-native";

const CoffeeDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [coffee, setCoffee] = useState<Coffee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sizeSelected, setSizeSelected] = useState<string>("S");

  const sizes = ["S", "M", "L"];

  const superiority = [
    <Ionicons name="bicycle" size={24} color={Colors.brown_normal} />,
    <Ionicons name="cafe" size={24} color={Colors.brown_normal} />,
    <Ionicons name="bag-check" size={24} color={Colors.brown_normal} />,
  ];

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaViewWrapper>
        <Navbar showBackButton={true} title="Detail" showFavoriteIcon={true} />

        {coffee && (
          <View style={styles.container}>
            <FadeSlideInView style={styles.image_container}>
              <Image
                source={{ uri: coffee.image_url }}
                alt="Coffee Image"
                resizeMode="cover"
                style={styles.image}
              />
            </FadeSlideInView>
            <Spacer height={16} />
            <FadeInView style={styles.short_description_container}>
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

              <View style={styles.superiority_container}>
                {superiority.map((icon, index) => (
                  <StaggeredItem
                    index={index}
                    key={index}
                    staggerDelay={100}
                    style={styles.superiority_icon}
                  >
                    {icon}
                  </StaggeredItem>
                ))}
              </View>
            </FadeInView>

            <View style={styles.divider_line}></View>

            <FadeInView style={styles.description_container}>
              <Text style={styles.description_title}>Description</Text>
              <Text style={styles.description_content}>
                {coffee.description}
              </Text>
            </FadeInView>

            <Spacer height={24} />

            <View style={styles.sizes_container}>
              <Text style={styles.size_title}>Size</Text>
              <View style={styles.sizes_options_container}>
                {sizes.map((size, index) => (
                  <StaggeredItem key={index} index={index} staggerDelay={50}>
                    <AnimatedPressable
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
                  </StaggeredItem>
                ))}
              </View>
            </View>
          </View>
        )}

        <Spacer height={24} />

        <View style={styles.price_container}>
          <View style={styles.price_value_container}>
            <Text style={styles.price_title}>Price</Text>
            <Text style={styles.price_value}>
              {coffee && <Text>₦ {coffee.price}</Text>}
            </Text>
          </View>
          <AnimatedPressable style={styles.buy_btn}>
            <Text style={styles.buy_btn_text}>Buy Now</Text>
          </AnimatedPressable>
        </View>
      </SafeAreaViewWrapper>
    </ScrollView>
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
    flex: 1,
    marginRight: 12,
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

  superiority_container: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  superiority_icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.grey_line,
  },

  price_container: {
    paddingHorizontal: 24,
    backgroundColor: "white",
    paddingTop: 16,
    paddingBottom: 46,
    borderTopRightRadius: 24,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  price_value_container: {
    display: "flex",
    flexDirection: "column",
    gap: 4

  },
  price_title: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.grey_light,

  },
  price_value:{
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: Colors.brown_normal
  },

  buy_btn: {
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: Colors.brown_normal
  },
  buy_btn_text:{
    color: "white",
    fontFamily: fonts.semibold,
    fontSize: 16
  }
});
