import {
  AnimatedPressable,
  FadeInView,
  FadeSlideInView,
  StaggeredItem,
} from "@/components/animations/Reanimated";
import CoffeeCard from "@/components/CoffeeCard";
import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Coffee, fetchAllCoffees, fetchCoffeeByTag, fetchCoffeeById } from "@/lib/coffeeApi";
import { getCurrentLocation } from "@/lib/locationApi";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Keyboard,
  Pressable,
  ScrollView,
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

const CategoryItem = ({
  item,
  isSelected,
  onPress,
}: {
  item: string;
  isSelected: boolean;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress}>
    <Text
      style={[
        styles.category_item,
        isSelected ? styles.category_selected : styles.category_unselected,
      ]}
    >
      {item}
    </Text>
  </Pressable>
);

const Home = () => {
  const router = useRouter();
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Coffee");
  const [location, setLocation] = useState<string | null>("");
  const [locationLoading, setLocationLoading] = useState<boolean>(false);

  const fetchUserCurrentLocation = async () => {
    setLocationLoading(true);
    const { data, error } = await getCurrentLocation();
    if (data) {
      setLocation(data.formattedAddress);
      console.log(data.formattedAddress); // "Akure, Ondo State, Nigeria"
      console.log(data.city); // "Akure"
      console.log(data.latitude); // 7.2526
    }
    setLocationLoading(false);
  };

  const getCoffeesByCategory = async (category: string) => {
    setLoading(true);

    if (category === "All Coffee") {
      const { data, error } = await fetchAllCoffees();
      if (data) {
        setCoffees(data as Coffee[]);
      } else {
        console.log("Error fetching coffees:", error);
      }
    } else {
      const { data, error } = await fetchCoffeeByTag(category.toLowerCase());
      if (data) {
        setCoffees(data as Coffee[]);
      } else {
        console.log("Error fetching coffees by tag:", error);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    getCoffeesByCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    fetchUserCurrentLocation();
  }, []);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const goToCoffeeDetail = (id: number) => {
    router.push(`/coffee/${id}`);
  };

  const renderCategory = useCallback(
    ({ item }: { item: string }) => (
      <CategoryItem
        item={item}
        isSelected={item === selectedCategory}
        onPress={() => handleCategoryPress(item)}
      />
    ),
    [selectedCategory],
  );

 

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={["#111111", "#313131"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <SafeAreaViewWrapper>
          <Pressable onPress={Keyboard.dismiss}>
            <View style={styles.location_container}>
              <Text style={styles.location_heading}>Location</Text>
              {locationLoading ? (
                <View style={styles.location_loading_container}>
                  <ActivityIndicator size="small" color={Colors.brown_normal} />
                </View>
              ) : (
                <FadeInView>
                  <Text style={styles.location_value}>{location}</Text>
                </FadeInView>
              )}
            </View>
            <Spacer height={24} />
            <FadeInView style={styles.search_container}>
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
        <FadeSlideInView style={styles.banner_container}>
          <ImageBackground
            source={require("../../assets/images/home-banner.png")}
            style={styles.banner_img}
          >
            <Text style={styles.promo_text}>Promo</Text>
            <Text style={styles.promo_value}>Buy one get one FREE</Text>
          </ImageBackground>
        </FadeSlideInView>
      </View>

      <Spacer height={24} style={{ marginTop: -56 }} />

      <FadeInView>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCategory}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.category_content}
          style={styles.category_container}
        />
      </FadeInView>

      <Spacer height={16} />

      {loading ? (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color={Colors.brown_normal} />
        </View>
      ) : coffees.length === 0 ? (
        <View style={styles.empty_container}>
          <Text style={styles.empty_text}>
            No coffees found for this category
          </Text>
        </View>
      ) : (
        <View style={styles.coffee_grid}>
          {coffees.map((item, index) => (
            <StaggeredItem key={item.id} index={index} staggerDelay={50}>
              <CoffeeCard
                id={item.id}
                name={item.name}
                image_url={item.image_url}
                tags={item.tags}
                price={item.price}
                selectedCategory={selectedCategory}
                handleNavigation={goToCoffeeDetail}
              />
            </StaggeredItem>
          ))}
        </View>
      )}
      <Spacer height={100} />
    </ScrollView>
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
    gap: 16,
  },

  category_item: {
    fontFamily: fonts.semibold,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    overflow: "hidden",
  },

  category_selected: {
    backgroundColor: Colors.brown_normal,
    color: "white",
  },

  category_unselected: {
    backgroundColor: Colors.brown_text,
    color: Colors.grey_light,
  },

  coffee_grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    rowGap: 16,
    justifyContent: "space-between",
  },

  coffee_content: {
    paddingHorizontal: 24,
    gap: 16,
  },

  coffee_row: {
    justifyContent: "space-between",
    gap: 16,
  },

  loading_container: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  location_loading_container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 8,
  },

  empty_container: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  empty_text: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.grey_light,
  },
});
