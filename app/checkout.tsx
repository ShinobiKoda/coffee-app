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
import { useCart } from "@/providers/CartProvider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type PaymentMethod = "wallet" | "card" | "cash";

const Checkout = () => {
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [selectedPayment, setSelectedPayment] =
    useState<PaymentMethod>("wallet");
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoApplied, setPromoApplied] = useState<boolean>(false);

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

  const subtotal = getCartTotal();
  const deliveryFee = 1000;
  const discount = promoApplied ? 500 : 0;
  const total = subtotal + deliveryFee - discount;

  const paymentMethods = [
    {
      id: "wallet" as PaymentMethod,
      name: "Wallet",
      icon: "wallet-outline" as const,
      balance: "₦ 50,000,000.00",
    },
    {
      id: "card" as PaymentMethod,
      name: "Credit Card",
      icon: "card-outline" as const,
      detail: "**** 4532",
    },
    {
      id: "cash" as PaymentMethod,
      name: "Cash on Delivery",
      icon: "cash-outline" as const,
      detail: "Pay when you receive",
    },
  ];

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "coffee10") {
      setPromoApplied(true);
      Alert.alert("Success", "Promo code applied successfully!");
    } else if (promoCode.trim() === "") {
      Alert.alert("Error", "Please enter a promo code");
    } else {
      Alert.alert("Error", "Invalid promo code");
    }
  };

  const handlePlaceOrder = () => {
    Alert.alert(
      "Order Placed!",
      "Your order has been placed successfully. Thank you for your purchase!",
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            router.push("/dashboard/Home");
          },
        },
      ],
    );
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaViewWrapper>
        <Navbar showBackButton={true} title="Checkout" />
        <View style={styles.empty_container}>
          <Ionicons name="cart-outline" size={64} color={Colors.grey_line} />
          <Text style={styles.empty_title}>No items to checkout</Text>
          <AnimatedPressable
            style={styles.browse_btn}
            onPress={() => router.push("/dashboard/Home")}
          >
            <Text style={styles.browse_btn_text}>Browse Coffees</Text>
          </AnimatedPressable>
        </View>
      </SafeAreaViewWrapper>
    );
  }

  return (
    <SafeAreaViewWrapper>
      <Navbar showBackButton={true} title="Checkout" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer height={16} />
        <View style={styles.container}>
          {/* Order Items Summary */}
          <FadeInView style={styles.section}>
            <View style={styles.section_header}>
              <Text style={styles.section_title}>Order Items</Text>
              <Text style={styles.item_count}>
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </Text>
            </View>
            <Spacer height={12} />
            <View style={styles.items_list}>
              {cartItems.map((item, index) => (
                <StaggeredItem
                  key={item.coffee.id}
                  index={index}
                  staggerDelay={50}
                >
                  <View style={styles.item_row}>
                    <View style={styles.item_image_container}>
                      <Image
                        source={{ uri: item.coffee.image_url }}
                        style={styles.item_image}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={styles.item_details}>
                      <Text style={styles.item_name} numberOfLines={1}>
                        {item.coffee.name}
                      </Text>
                      <Text style={styles.item_size}>
                        Size {item.size} × {item.quantity}
                      </Text>
                    </View>
                    <Text style={styles.item_price}>
                      ₦ {formatCurrency(calculateItemPrice(item))}
                    </Text>
                  </View>
                </StaggeredItem>
              ))}
            </View>
          </FadeInView>

          <Spacer height={20} />

          {/* Promo Code */}
          <FadeSlideInView delay={100} style={styles.section}>
            <Text style={styles.section_title}>Promo Code</Text>
            <Spacer height={12} />
            <View style={styles.promo_container}>
              <View style={styles.promo_input_wrapper}>
                <Ionicons
                  name="pricetag-outline"
                  size={18}
                  color={Colors.grey_light}
                />
                <TextInput
                  style={styles.promo_input}
                  placeholder="Enter promo code"
                  placeholderTextColor={Colors.grey_light}
                  value={promoCode}
                  onChangeText={setPromoCode}
                  autoCapitalize="characters"
                  editable={!promoApplied}
                />
              </View>
              <AnimatedPressable
                style={[
                  styles.promo_btn,
                  promoApplied && styles.promo_btn_applied,
                ]}
                onPress={handleApplyPromo}
                disabled={promoApplied}
              >
                <Text
                  style={[
                    styles.promo_btn_text,
                    promoApplied && styles.promo_btn_text_applied,
                  ]}
                >
                  {promoApplied ? "Applied" : "Apply"}
                </Text>
              </AnimatedPressable>
            </View>
            {promoApplied && (
              <View style={styles.promo_success}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.promo_success_text}>
                  Promo code "COFFEE10" applied - ₦500 off
                </Text>
              </View>
            )}
          </FadeSlideInView>

          <Spacer height={20} />

          {/* Payment Method */}
          <FadeSlideInView delay={150} style={styles.section}>
            <Text style={styles.section_title}>Payment Method</Text>
            <Spacer height={12} />
            <View style={styles.payment_list}>
              {paymentMethods.map((method, index) => (
                <StaggeredItem key={method.id} index={index} staggerDelay={60}>
                  <AnimatedPressable
                    style={[
                      styles.payment_card,
                      selectedPayment === method.id &&
                        styles.payment_card_selected,
                    ]}
                    onPress={() => setSelectedPayment(method.id)}
                  >
                    <View style={styles.payment_left}>
                      <View
                        style={[
                          styles.payment_icon_container,
                          selectedPayment === method.id &&
                            styles.payment_icon_selected,
                        ]}
                      >
                        <Ionicons
                          name={method.icon}
                          size={20}
                          color={
                            selectedPayment === method.id
                              ? Colors.brown_normal
                              : Colors.grey_light
                          }
                        />
                      </View>
                      <View>
                        <Text style={styles.payment_name}>{method.name}</Text>
                        {method.balance && (
                          <Text style={styles.payment_detail}>
                            {method.balance}
                          </Text>
                        )}
                        {method.detail && (
                          <Text style={styles.payment_detail}>
                            {method.detail}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View
                      style={[
                        styles.payment_radio,
                        selectedPayment === method.id &&
                          styles.payment_radio_selected,
                      ]}
                    >
                      {selectedPayment === method.id && (
                        <View style={styles.payment_radio_inner} />
                      )}
                    </View>
                  </AnimatedPressable>
                </StaggeredItem>
              ))}
            </View>
          </FadeSlideInView>

          <Spacer height={20} />

          {/* Order Summary */}
          <FadeSlideInView delay={200} style={styles.summary_section}>
            <Text style={styles.section_title}>Order Summary</Text>
            <Spacer height={16} />
            <View style={styles.summary_row}>
              <Text style={styles.summary_label}>Subtotal</Text>
              <Text style={styles.summary_value}>
                ₦ {formatCurrency(subtotal)}
              </Text>
            </View>
            <View style={styles.summary_row}>
              <Text style={styles.summary_label}>Delivery Fee</Text>
              <Text style={styles.summary_value}>
                ₦ {formatCurrency(deliveryFee)}
              </Text>
            </View>
            {promoApplied && (
              <View style={styles.summary_row}>
                <Text style={styles.summary_label}>Discount</Text>
                <Text style={[styles.summary_value, styles.discount_value]}>
                  -₦ {formatCurrency(discount)}
                </Text>
              </View>
            )}
            <View style={styles.divider} />
            <View style={styles.summary_row}>
              <Text style={styles.total_label}>Total</Text>
              <Text style={styles.total_value}>₦ {formatCurrency(total)}</Text>
            </View>
          </FadeSlideInView>
        </View>

        <Spacer height={24} />

        {/* Place Order Button */}
        <View style={styles.checkout_footer}>
          <View style={styles.footer_info}>
            <Text style={styles.footer_label}>Total Payment</Text>
            <Text style={styles.footer_total}>₦ {formatCurrency(total)}</Text>
          </View>
          <AnimatedPressable
            style={styles.place_order_btn}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.place_order_text}>Place Order</Text>
            <Ionicons name="checkmark-circle" size={20} color="white" />
          </AnimatedPressable>
        </View>

        <Spacer height={40} />
      </ScrollView>
    </SafeAreaViewWrapper>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },

  empty_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },

  empty_title: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: Colors.grey_normal,
  },

  browse_btn: {
    backgroundColor: Colors.brown_normal,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },

  browse_btn_text: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: "white",
  },

  section: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.grey_line,
  },

  section_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  section_title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  item_count: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
  },

  items_list: {
    gap: 12,
  },

  item_row: {
    flexDirection: "row",
    alignItems: "center",
  },

  item_image_container: {
    width: 48,
    height: 48,
    borderRadius: 8,
    overflow: "hidden",
  },

  item_image: {
    width: "100%",
    height: "100%",
  },

  item_details: {
    flex: 1,
    marginLeft: 12,
  },

  item_name: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: Colors.grey_normal,
  },

  item_size: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
    marginTop: 2,
  },

  item_price: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: Colors.brown_normal,
  },

  promo_container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  promo_input_wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.brown_light,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },

  promo_input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.grey_normal,
  },

  promo_btn: {
    backgroundColor: Colors.brown_normal,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },

  promo_btn_applied: {
    backgroundColor: "#4CAF50",
  },

  promo_btn_text: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: "white",
  },

  promo_btn_text_applied: {
    color: "white",
  },

  promo_success: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },

  promo_success_text: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: "#4CAF50",
  },

  payment_list: {
    gap: 12,
  },

  payment_card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.grey_line,
    backgroundColor: "white",
  },

  payment_card_selected: {
    borderColor: Colors.brown_normal,
    backgroundColor: Colors.brown_light,
  },

  payment_left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  payment_icon_container: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.grey_line,
    alignItems: "center",
    justifyContent: "center",
  },

  payment_icon_selected: {
    backgroundColor: "white",
  },

  payment_name: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: Colors.grey_normal,
  },

  payment_detail: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
    marginTop: 2,
  },

  payment_radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grey_line,
    alignItems: "center",
    justifyContent: "center",
  },

  payment_radio_selected: {
    borderColor: Colors.brown_normal,
  },

  payment_radio_inner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.brown_normal,
  },

  summary_section: {
    backgroundColor: Colors.brown_light,
    borderRadius: 16,
    padding: 20,
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

  discount_value: {
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
    fontSize: 20,
    color: Colors.brown_normal,
  },

  checkout_footer: {
    backgroundColor: "white",
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.grey_line,
  },

  footer_info: {
    gap: 2,
  },

  footer_label: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
  },

  footer_total: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: Colors.brown_normal,
  },

  place_order_btn: {
    backgroundColor: Colors.brown_normal,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },

  place_order_text: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: "white",
  },
});
