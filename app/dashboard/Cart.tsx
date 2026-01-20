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
import { useCart } from "@/providers/CartProvider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Cart = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } =
    useCart();

  const formatTags = (tags: string[]) => {
    if (!tags || tags.length === 0) return "";
    if (tags.length === 1) return tags[0];
    return `${tags[0]}/${tags[1]}`;
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calculateItemPrice = (item: {
    coffee: { price: number };
    size: string;
    quantity: number;
  }) => {
    const sizeMultiplier =
      item.size === "S" ? 0.8 : item.size === "L" ? 1.2 : 1;
    return item.coffee.price * sizeMultiplier * item.quantity;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemPrice(item),
      0,
    );
  };

  const deliveryFee = 1000;
  const discount = 500;

  const calculateTotal = () => {
    return calculateSubtotal() + deliveryFee - discount;
  };

  return (
    <SafeAreaViewWrapper>
      <Navbar title="Cart" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer height={16} />
        <View style={styles.container}>
          {/* Header Section */}
          <FadeInView style={styles.header_section}>
            <View style={styles.header_content}>
              <Ionicons name="cart" size={24} color={Colors.brown_normal} />
              <Text style={styles.header_count}>
                {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
              </Text>
            </View>
            <Text style={styles.header_subtitle}>Review your order</Text>
          </FadeInView>

          <Spacer height={24} />

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <FadeSlideInView style={styles.empty_container}>
              <Ionicons
                name="cart-outline"
                size={64}
                color={Colors.grey_line}
              />
              <Text style={styles.empty_title}>Your Cart is Empty</Text>
              <Text style={styles.empty_subtitle}>
                Add some delicious coffee to get started
              </Text>
              <AnimatedPressable
                style={styles.browse_btn}
                onPress={() => router.push("/dashboard/Home")}
              >
                <Text style={styles.browse_btn_text}>Browse Coffees</Text>
              </AnimatedPressable>
            </FadeSlideInView>
          ) : (
            <>
              <View style={styles.cart_list}>
                {cartItems.map((item, index) => (
                  <StaggeredItem
                    key={item.coffee.id}
                    index={index}
                    staggerDelay={80}
                  >
                    <View style={styles.cart_card}>
                      <View style={styles.cart_content}>
                        <View style={styles.cart_image_container}>
                          <Image
                            source={{ uri: item.coffee.image_url }}
                            style={styles.cart_image}
                            resizeMode="cover"
                          />
                        </View>
                        <View style={styles.cart_info}>
                          <View style={styles.cart_header}>
                            <Text style={styles.cart_name}>
                              {item.coffee.name}
                            </Text>
                            <AnimatedPressable
                              style={styles.remove_btn}
                              onPress={() => removeFromCart(item.coffee.id)}
                            >
                              <Ionicons
                                name="trash-outline"
                                size={18}
                                color={Colors.promo_red}
                              />
                            </AnimatedPressable>
                          </View>
                          <Text style={styles.cart_tags}>
                            {formatTags(item.coffee.tags)} • Size {item.size}
                          </Text>
                          <View style={styles.cart_footer}>
                            <Text style={styles.cart_price}>
                              ₦ {formatCurrency(calculateItemPrice(item))}
                            </Text>
                            <View style={styles.quantity_controls}>
                              <AnimatedPressable
                                style={[
                                  styles.quantity_btn,
                                  item.quantity <= 1 &&
                                    styles.quantity_btn_disabled,
                                ]}
                                onPress={() =>
                                  decrementQuantity(item.coffee.id)
                                }
                              >
                                <Ionicons
                                  name="remove"
                                  size={16}
                                  color={
                                    item.quantity <= 1
                                      ? Colors.grey_line
                                      : Colors.grey_normal
                                  }
                                />
                              </AnimatedPressable>
                              <Text style={styles.quantity_text}>
                                {item.quantity}
                              </Text>
                              <AnimatedPressable
                                style={styles.quantity_btn}
                                onPress={() =>
                                  incrementQuantity(item.coffee.id)
                                }
                              >
                                <Ionicons
                                  name="add"
                                  size={16}
                                  color={Colors.grey_normal}
                                />
                              </AnimatedPressable>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </StaggeredItem>
                ))}
              </View>

              <Spacer height={24} />

              {/* Order Summary */}
              <FadeSlideInView delay={200} style={styles.summary_container}>
                <Text style={styles.summary_title}>Order Summary</Text>
                <Spacer height={16} />
                <View style={styles.summary_row}>
                  <Text style={styles.summary_label}>Subtotal</Text>
                  <Text style={styles.summary_value}>
                    ₦ {formatCurrency(calculateSubtotal())}
                  </Text>
                </View>
                <View style={styles.summary_row}>
                  <Text style={styles.summary_label}>Delivery Fee</Text>
                  <Text style={styles.summary_value}>
                    ₦ {formatCurrency(deliveryFee)}
                  </Text>
                </View>
                <View style={styles.summary_row}>
                  <Text style={styles.summary_label}>Discount</Text>
                  <Text style={[styles.summary_value, styles.discount_text]}>
                    -₦ {formatCurrency(discount)}
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summary_row}>
                  <Text style={styles.total_label}>Total</Text>
                  <Text style={styles.total_value}>
                    ₦ {formatCurrency(calculateTotal())}
                  </Text>
                </View>
              </FadeSlideInView>

              <Spacer height={24} />

              {/* Checkout Button */}
              <FadeSlideInView delay={300}>
                <AnimatedPressable
                  style={styles.checkout_btn}
                  onPress={() => router.push("/checkout")}
                >
                  <Text style={styles.checkout_text}>Proceed to Checkout</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </AnimatedPressable>
              </FadeSlideInView>
            </>
          )}
        </View>
        <Spacer height={100} />
      </ScrollView>
    </SafeAreaViewWrapper>
  );
};

export default Cart;

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

  cart_list: {
    gap: 16,
  },

  cart_card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.grey_line,
  },

  cart_content: {
    flexDirection: "row",
  },

  cart_image_container: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
  },

  cart_image: {
    width: "100%",
    height: "100%",
  },

  cart_info: {
    flex: 1,
    marginLeft: 16,
  },

  cart_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cart_name: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
    flex: 1,
  },

  remove_btn: {
    padding: 4,
  },

  cart_tags: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
    textTransform: "capitalize",
    marginTop: 4,
  },

  cart_footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  cart_price: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.brown_normal,
  },

  quantity_controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  quantity_btn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.brown_light,
    alignItems: "center",
    justifyContent: "center",
  },

  quantity_btn_disabled: {
    opacity: 0.5,
  },

  quantity_text: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: Colors.grey_normal,
    minWidth: 20,
    textAlign: "center",
  },

  summary_container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.grey_line,
  },

  summary_title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  summary_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  summary_label: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.grey_light,
  },

  summary_value: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: Colors.grey_normal,
  },

  discount_text: {
    color: Colors.promo_red,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.grey_line,
    marginVertical: 12,
  },

  total_label: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  total_value: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: Colors.brown_normal,
  },

  checkout_btn: {
    backgroundColor: Colors.brown_normal,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },

  checkout_text: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: "white",
  },
});
