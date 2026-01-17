import {
  AnimatedPressable,
  StaggeredItem,
  FadeInView,
  SlideInView
} from "@/components/animations/Reanimated";
import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Coffee, fetchAllCoffees } from "@/lib/coffeeApi";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const categories = [
  "All Coffee",
  "Hot",
  "Strong",
  "Classic",
  "Iced",
  "Sweet",
  "Popular",
  "Creamy",
  "Smooth",
  "Strong",
  "Dessert",
  "Chocolate",
  "Blended",
  "Traditional",
  "Premium",
  "Alcoholic",
  "Intense",
  "Spiced",
  "Tea-based",
];

const Home = () => {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Coffee");

  const getAllCoffees = async () => {
    setLoading(true);
    const { data, error } = await fetchAllCoffees();
    if (data) {
      setCoffees(data as Coffee[]);
    } else {
      console.log("Error fetching coffees:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCoffees();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#111111", "#313131"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <SafeAreaViewWrapper>
          <Pressable onPress={Keyboard.dismiss}>
            <SlideInView direction="down" style={styles.location_container}>
              <Text style={styles.location_heading}>Location</Text>
              <Text style={styles.location_value}>
                Akure, Ondo State, Nigeria
              </Text>
            </SlideInView>
            <Spacer height={24} />
            <FadeInView  style={styles.search_container}>
              <View style={styles.searchbar}>
                <Ionicons size={20} name="search" color="white" />
                <TextInput
                  placeholder="Search Coffee"
                  keyboardType="default"
                  placeholderTextColor={Colors.grey_light}
                  style={styles.input_field}
                />
              </View>
              <AnimatedPressable style={styles.filter_button}>
                <Ionicons name="filter-outline" size={20} color={"white"} />
              </AnimatedPressable>
            </FadeInView>

            <Spacer height={24} />
          </Pressable>
        </SafeAreaViewWrapper>
      </LinearGradient>

      <View
        style={{
          paddingHorizontal: 24,
          position: "relative",
          top: -56,
        }}
      >
        <FadeInView style={styles.banner_container}>
          <ImageBackground
            source={require("../../assets/images/home-banner.png")}
            style={styles.banner_img}
          >
            <Text style={styles.promo_text}>Promo</Text>
            <Text style={styles.promo_value}>Buy one get one FREE</Text>
          </ImageBackground>
        </FadeInView>
      </View>

      <Spacer height={24} style={{ marginTop: -56 }} />

      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <StaggeredItem index={index} staggerDelay={50} direction="up">
            <Pressable onPress={() => setSelectedCategory(item)}>
              <Text
                style={[
                  styles.category_item,
                  item === selectedCategory
                    ? { backgroundColor: Colors.brown_normal, color: "white" }
                    : { backgroundColor: Colors.brown_text },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          </StaggeredItem>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.category_content}
        style={styles.category_container}
      />
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
    overflow: "hidden",
  },
  banner_img: {
    paddingHorizontal: 24,
    paddingVertical: 13,
  },
  promo_text: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: Colors.promo_red,
    borderRadius: 8,
    color: "white",
    fontFamily: fonts.semibold,
    fontSize: 14,
    maxWidth: 70,
  },
  promo_value: {
    fontFamily: fonts.semibold,
    color: "white",
    fontSize: 32,
  },

  category_container: {
    maxHeight: 40,
  },

  category_content: {
    paddingHorizontal: 24,
    gap: 8,
  },

  category_item: {
    fontFamily: fonts.semibold,
    color: Colors.grey_text,
    paddingHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: Colors.brown_text,
    borderRadius: 6,
  },
});
