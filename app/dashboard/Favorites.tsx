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
import { useFavorites } from "@/providers/FavoritesProvider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Favorites = () => {
  const router = useRouter();
  const { favorites, removeFromFavorites } = useFavorites();

  const goToCoffeeDetail = (id: number) => {
    router.push(`/coffee/${id}`);
  };

  const formatTags = (tags: string[]) => {
    if (!tags || tags.length === 0) return "";
    if (tags.length === 1) return tags[0];
    return `${tags[0]}/${tags[1]}`;
  };

  return (
    <SafeAreaViewWrapper>
      <Navbar title="Favorites" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer height={16} />
        <View style={styles.container}>
          {/* Header Section */}
          <FadeInView style={styles.header_section}>
            <View style={styles.header_content}>
              <Ionicons name="heart" size={24} color={Colors.brown_normal} />
              <Text style={styles.header_count}>
                {favorites.length} {favorites.length === 1 ? "Item" : "Items"}
              </Text>
            </View>
            <Text style={styles.header_subtitle}>
              Your favorite coffee picks
            </Text>
          </FadeInView>

          <Spacer height={24} />

          {/* Favorites List */}
          {favorites.length === 0 ? (
            <FadeSlideInView style={styles.empty_container}>
              <Ionicons
                name="heart-outline"
                size={64}
                color={Colors.grey_line}
              />
              <Text style={styles.empty_title}>No Favorites Yet</Text>
              <Text style={styles.empty_subtitle}>
                Start adding your favorite coffees by tapping the heart icon
              </Text>
              <AnimatedPressable
                style={styles.browse_btn}
                onPress={() => router.push("/dashboard/Home")}
              >
                <Text style={styles.browse_btn_text}>Browse Coffees</Text>
              </AnimatedPressable>
            </FadeSlideInView>
          ) : (
            <View style={styles.favorites_list}>
              {favorites.map((item, index) => (
                <StaggeredItem key={item.id} index={index} staggerDelay={80}>
                  <View style={styles.favorite_card}>
                    <AnimatedPressable
                      style={styles.favorite_content}
                      onPress={() => goToCoffeeDetail(item.id)}
                    >
                      <View style={styles.favorite_image_container}>
                        <Image
                          source={{ uri: item.image_url }}
                          style={styles.favorite_image}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={styles.favorite_info}>
                        <Text style={styles.favorite_name}>{item.name}</Text>
                        <Text style={styles.favorite_tags}>
                          {formatTags(item.tags)}
                        </Text>
                        <View style={styles.rating_container}>
                          <Ionicons
                            name="star"
                            size={14}
                            color={Colors.brown_normal}
                          />
                          <Text style={styles.rating_text}>{item.rating}</Text>
                        </View>
                      </View>
                      <View style={styles.favorite_actions}>
                        <Text style={styles.favorite_price}>
                          ₦ {item.price}
                        </Text>
                        <AnimatedPressable
                          style={styles.remove_btn}
                          onPress={() => removeFromFavorites(item.id)}
                        >
                          <Ionicons
                            name="heart"
                            size={20}
                            color={Colors.brown_normal}
                          />
                        </AnimatedPressable>
                      </View>
                    </AnimatedPressable>
                  </View>
                </StaggeredItem>
              ))}
            </View>
          )}
        </View>
        <Spacer height={100} />
      </ScrollView>
    </SafeAreaViewWrapper>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },

  loading_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  loading_text: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.grey_light,
  },

  header_section: {
    backgroundColor: Colors.brown_light,
    padding: 20,
    borderRadius: 16,
  },

  header_content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  header_count: {
    fontFamily: fonts.semibold,
    fontSize: 20,
    color: Colors.grey_normal,
  },

  header_subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.grey_light,
    marginTop: 4,
  },

  empty_container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 16,
  },

  empty_title: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: Colors.grey_normal,
  },

  empty_subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.grey_light,
    textAlign: "center",
    paddingHorizontal: 40,
  },

  browse_btn: {
    backgroundColor: Colors.brown_normal,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 8,
  },

  browse_btn_text: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: "white",
  },

  favorites_list: {
    gap: 16,
  },

  favorite_card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.grey_line,
  },

  favorite_content: {
    flexDirection: "row",
    alignItems: "center",
  },

  favorite_image_container: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
  },

  favorite_image: {
    width: "100%",
    height: "100%",
  },

  favorite_info: {
    flex: 1,
    marginLeft: 16,
    gap: 4,
  },

  favorite_name: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  favorite_tags: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
    textTransform: "capitalize",
  },

  rating_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  rating_text: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: Colors.grey_normal,
  },

  favorite_actions: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 80,
  },

  favorite_price: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.brown_normal,
  },

  remove_btn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.brown_light,
    alignItems: "center",
    justifyContent: "center",
  },
});
