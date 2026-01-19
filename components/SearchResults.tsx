import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Coffee } from "@/lib/coffeeApi";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CoffeeCard from "./CoffeeCard";
import {
  FadeInView,
  FadeSlideInView,
  StaggeredItem,
} from "./animations/Reanimated";

interface SearchResultsProps {
  searchQuery: string;
  searchResults: Coffee[];
  isSearching: boolean;
  onClearSearch: () => void;
  onCoffeePress: (id: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  searchResults,
  isSearching,
  onClearSearch,
  onCoffeePress,
}) => {
  return (
    <FadeInView duration={300}>
      {/* Search Header */}
      <View style={styles.search_header}>
        <View style={styles.search_info}>
          <Ionicons name="search" size={16} color={Colors.grey_light} />
          <Text style={styles.search_query_text}>
            Results for "{searchQuery}"
          </Text>
        </View>
        <Pressable onPress={onClearSearch} style={styles.clear_button}>
          <Ionicons name="close-circle" size={20} color={Colors.grey_light} />
          <Text style={styles.clear_text}>Clear</Text>
        </Pressable>
      </View>

      {/* Loading State */}
      {isSearching ? (
        <FadeInView style={styles.loading_container}>
          <ActivityIndicator size="large" color={Colors.brown_normal} />
          <Text style={styles.loading_text}>Searching...</Text>
        </FadeInView>
      ) : searchResults.length === 0 ? (
        /* Empty State */
        <FadeSlideInView direction="up" style={styles.empty_container}>
          <Ionicons name="cafe-outline" size={48} color={Colors.grey_light} />
          <Text style={styles.empty_title}>No coffees found</Text>
          <Text style={styles.empty_subtitle}>
            Try searching with different keywords
          </Text>
        </FadeSlideInView>
      ) : (
        /* Results Grid */
        <FadeInView>
          <Text style={styles.results_count}>
            {searchResults.length} coffee{searchResults.length !== 1 ? "s" : ""}{" "}
            found
          </Text>
          <View style={styles.coffee_grid}>
            {searchResults.map((item, index) => (
              <StaggeredItem key={item.id} index={index} staggerDelay={50}>
                <CoffeeCard
                  id={item.id}
                  name={item.name}
                  image_url={item.image_url}
                  tags={item.tags}
                  price={item.price}
                  selectedCategory="Search"
                  handleNavigation={onCoffeePress}
                />
              </StaggeredItem>
            ))}
          </View>
        </FadeInView>
      )}
    </FadeInView>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  search_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  search_info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  search_query_text: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: Colors.grey_light,
  },
  clear_button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.brown_normal,
    borderRadius: 20,
  },
  clear_text: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color:"white",
  },
  loading_container: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loading_text: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.grey_light,
  },
  empty_container: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  empty_title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_light,
    marginTop: 8,
  },
  empty_subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.grey_light,
    opacity: 0.7,
  },
  results_count: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  coffee_grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    rowGap: 16,
    justifyContent: "space-between",
  },
});
