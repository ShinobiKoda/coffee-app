import Navbar from "@/components/Navbar";
import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Coffee, fetchCoffeeById } from "@/lib/coffeeApi";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CoffeeDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [coffee, setCoffee] = useState<Coffee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
                <Ionicons name="star" size={20} color="#FBBE21"/>
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

          <Spacer height={24}/>

          <View>
            <Text>Size</Text>
            <View></View>
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
    gap: 4
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
    color: Colors.grey_light
  },

  rating:{
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal
  },

  purchases: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light
  },

  divider_line:{
    margin: 16,
    height: 1,
    backgroundColor: Colors.grey_line,
  },

  description_container:{
    display: "flex",
    flexDirection: "column",
    gap: 8
  },

  description_title:{
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal
  },

  description_content: {
    fontFamily: fonts.light,
    fontSize: 14,
    color: Colors.grey_light
  },


});
