import Navbar from "@/components/Navbar";
import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import Spacer from "@/components/Spacer";
import {
  AnimatedPressable,
  FadeInView,
  FadeSlideInView,
  StaggeredItem,
} from "@/components/animations/Reanimated";
import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { Coffee, fetchCoffeeById } from "@/lib/coffeeApi";
import { getCurrentLocation, LocationData } from "@/lib/locationApi";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface OrderItem {
  coffee: Coffee;
  size: string;
  quantity: number;
}

const Order = () => {
  const { coffeeId, size } = useLocalSearchParams<{
    coffeeId?: string;
    size?: string;
  }>();

  const transports = ["Deliver", "Pick Up"];

  const [transportType, setTransportType] = useState<string>("Deliver");
  const [orderItem, setOrderItem] = useState<OrderItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(true);

  // Fetch coffee details
  useEffect(() => {
    const fetchOrderData = async () => {
      if (!coffeeId) {
        // Default coffee for demo if no ID passed
        const { data } = await fetchCoffeeById(1);
        if (data) {
          setOrderItem({
            coffee: data,
            size: size || "M",
            quantity: 1,
          });
        }
      } else {
        const { data, error } = await fetchCoffeeById(Number(coffeeId));
        if (data) {
          setOrderItem({
            coffee: data,
            size: size || "M",
            quantity: 1,
          });
        } else {
          console.log("Error fetching coffee:", error);
        }
      }
      setLoading(false);
    };

    fetchOrderData();
  }, [coffeeId, size]);

  // Fetch user location
  useEffect(() => {
    const fetchLocation = async () => {
      setLocationLoading(true);
      const { data, error } = await getCurrentLocation();
      if (data) {
        setLocation(data);
      } else {
        console.log("Error fetching location:", error);
      }
      setLocationLoading(false);
    };

    fetchLocation();
  }, []);

  const incrementQuantity = () => {
    if (orderItem) {
      setOrderItem({ ...orderItem, quantity: orderItem.quantity + 1 });
    }
  };

  const decrementQuantity = () => {
    if (orderItem && orderItem.quantity > 1) {
      setOrderItem({ ...orderItem, quantity: orderItem.quantity - 1 });
    }
  };

  const formatTags = (tags: string[]) => {
    if (!tags || tags.length === 0) return "";
    if (tags.length === 1) return tags[0];
    return `${tags[0]}/${tags[1]}`;
  };

  const calculateTotal = () => {
    if (!orderItem) return 0;
    const basePrice = orderItem.coffee.price;
    const sizeMultiplier =
      orderItem.size === "S" ? 0.8 : orderItem.size === "L" ? 1.2 : 1;
    return (basePrice * sizeMultiplier * orderItem.quantity).toFixed(2);
  };

  if (loading) {
    return (
      <SafeAreaViewWrapper>
        <Navbar showBackButton={true} title="Order" />
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color={Colors.brown_normal} />
          <Text style={styles.loading_text}>Loading order...</Text>
        </View>
      </SafeAreaViewWrapper>
    );
  }

  return (
    <SafeAreaViewWrapper>
      <Navbar showBackButton={true} title="Order" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer height={24} />
        <View style={styles.container}>
          {/* Transport Type Selector */}
          <FadeInView style={styles.transport_type_container}>
            {transports.map((type, index) => (
              <View key={index} style={[styles.transport_btn_wrapper]}>
                <AnimatedPressable
                  style={[
                    styles.transport_btn,
                    transportType === type && styles.transport_selected,
                  ]}
                  onPress={() => setTransportType(type)}
                >
                  <Text
                    style={[
                      styles.transport_value,
                      transportType === type && styles.transport_value_selected,
                    ]}
                  >
                    {type}
                  </Text>
                </AnimatedPressable>
              </View>
            ))}
          </FadeInView>

          <Spacer height={28} />

          {/* Delivery Address */}
          <FadeSlideInView delay={100} style={styles.delivery_container}>
            <Text style={styles.delivery_title}>
              {transportType === "Deliver"
                ? "Delivery Address"
                : "Pick Up Location"}
            </Text>
            {locationLoading ? (
              <View style={styles.location_loading}>
                <ActivityIndicator size="small" color={Colors.brown_normal} />
                <Text style={styles.location_loading_text}>
                  Getting your location...
                </Text>
              </View>
            ) : location ? (
              <FadeInView style={styles.address_details}>
                <Text style={styles.city}>{location.city || "Your City"}</Text>
                <Text style={styles.address}>{location.formattedAddress}</Text>
              </FadeInView>
            ) : (
              <Text style={styles.address}>Unable to get location</Text>
            )}
            <View style={styles.action_btns_container}>
              <StaggeredItem index={0} staggerDelay={100}>
                <AnimatedPressable style={styles.action_btn}>
                  <Ionicons
                    name="pencil-outline"
                    size={14}
                    color={Colors.grey_normal}
                  />
                  <Text style={styles.action_text}>Edit Address</Text>
                </AnimatedPressable>
              </StaggeredItem>
              <StaggeredItem index={1} staggerDelay={100}>
                <AnimatedPressable style={styles.action_btn}>
                  <Ionicons
                    name="document-text-outline"
                    size={14}
                    color={Colors.grey_normal}
                  />
                  <Text style={styles.action_text}>Add Note</Text>
                </AnimatedPressable>
              </StaggeredItem>
            </View>
          </FadeSlideInView>

          <View style={styles.divider}></View>

          {/* Coffee Order Details */}
          <FadeSlideInView delay={200} style={styles.coffees_container}>
            {orderItem && (
              <View style={styles.coffee_detail_container}>
                <View style={styles.coffee_detail_description}>
                  <View style={styles.coffee_img_container}>
                    <Image
                      source={{ uri: orderItem.coffee.image_url }}
                      style={styles.coffee_image}
                      alt="Coffee Mini Image"
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.coffee_info}>
                    <Text style={styles.coffee_name}>
                      {orderItem.coffee.name}
                    </Text>
                    <Text style={styles.coffee_tags}>
                      {formatTags(orderItem.coffee.tags)} • Size{" "}
                      {orderItem.size}
                    </Text>
                  </View>
                </View>
                <View style={styles.cart_action_btns}>
                  <AnimatedPressable
                    style={[
                      styles.modify_coffee_count,
                      orderItem.quantity <= 1 && styles.modify_btn_disabled,
                    ]}
                    onPress={decrementQuantity}
                  >
                    <Ionicons
                      name="remove-outline"
                      size={15}
                      color={
                        orderItem.quantity <= 1
                          ? Colors.grey_line
                          : Colors.grey_light
                      }
                    />
                  </AnimatedPressable>
                  <Text style={styles.coffee_count}>{orderItem.quantity}</Text>
                  <AnimatedPressable
                    style={styles.modify_coffee_count}
                    onPress={incrementQuantity}
                  >
                    <Ionicons
                      name="add-outline"
                      size={15}
                      color={Colors.grey_normal}
                    />
                  </AnimatedPressable>
                </View>
              </View>
            )}
          </FadeSlideInView>

          <View style={styles.divider}></View>

          <AnimatedPressable style={styles.discount_container}>
            <Ionicons
              name="shield-checkmark-outline"
              size={20}
              color={Colors.brown_normal}
            />
            <Text style={styles.discount_text}>1 Discount Coupon Applied</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={Colors.grey_hover}
            />
          </AnimatedPressable>

          <Spacer height={24} />

          <View style={styles.price_summary_container}>
            <Text style={styles.payment_title}>Payment Summary</Text>
            <View style={styles.price_description_container}>
              <View style={styles.summary_container}>
                <Text style={styles.payment_summary_text}>Price</Text>
                <Text style={styles.price_value}>₦ 4500</Text>
              </View>
              <View style={styles.summary_container}>
                <Text style={styles.payment_summary_text}>Delivery Fee</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fonts.regular,
                      fontSize: 14,
                      color: Colors.grey_normal,
                      textDecorationLine: "line-through"
                    }}
                  >
                    ₦ 2000
                  </Text>
                  <Text style={styles.price_value}>₦ 1000</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaViewWrapper>
  );
};

export default Order;

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

  transport_type_container: {
    backgroundColor: Colors.brown_text,
    display: "flex",
    flexDirection: "row",
    borderRadius: 12,
    padding: 4,
    alignItems: "center",
    justifyContent: "space-between",
  },

  transport_btn_wrapper: {
    flex: 1,
  },

  transport_btn: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: "transparent",
    borderRadius: 8,
    alignItems: "center",
  },

  transport_value: {
    color: Colors.grey_normal,
    fontFamily: fonts.regular,
    fontSize: 16,
  },

  transport_selected: {
    backgroundColor: Colors.brown_normal,
  },

  transport_value_selected: {
    fontFamily: fonts.semibold,
    color: "white",
  },

  delivery_container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  delivery_title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  location_loading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  location_loading_text: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
  },

  address_details: {
    gap: 4,
  },

  city: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: Colors.grey_normal,
  },

  address: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
  },

  action_btns_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  action_btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: Colors.grey_light,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
  },

  action_text: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_normal,
  },

  divider: {
    height: 1,
    marginVertical: 16,
    marginHorizontal: 4,
    backgroundColor: Colors.grey_line,
  },

  divider_thin: {
    height: 1,
    marginVertical: 12,
    backgroundColor: Colors.grey_line,
  },

  coffees_container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  coffee_detail_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  coffee_detail_description: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },

  coffee_img_container: {
    height: 54,
    width: 54,
    borderRadius: 8,
    overflow: "hidden",
  },

  coffee_image: {
    width: "100%",
    height: "100%",
  },

  coffee_info: {
    flex: 1,
  },

  coffee_name: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  coffee_tags: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
    textTransform: "capitalize",
  },

  cart_action_btns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  modify_coffee_count: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.grey_line,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modify_btn_disabled: {
    opacity: 0.5,
  },

  coffee_count: {
    fontFamily: fonts.semibold,
    color: Colors.grey_normal,
    fontSize: 14,
    minWidth: 20,
    textAlign: "center",
  },

  discount_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 16,
    borderRadius: 16,
    justifyContent: "space-between",
  },
  discount_text: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: Colors.grey_normal,
  },
  price_summary_container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  payment_title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },
  price_description_container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  summary_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  payment_summary_text: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.grey_normal,
  },
  price_value: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: Colors.grey_normal,
  },
});
