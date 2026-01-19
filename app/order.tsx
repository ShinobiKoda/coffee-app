import Navbar from "@/components/Navbar";
import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import Spacer from "@/components/Spacer";
import { AnimatedPressable } from "@/components/animations/Reanimated";
import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const order = () => {
  const transports = ["Deliver", "Pick Up"];

  const [tranportType, setTransportType] = useState<string>("Deliver");

  return (
    <SafeAreaViewWrapper>
      <Navbar showBackButton={true} title="Order" />
      <Spacer height={24} />
      <View style={styles.container}>
        <View style={styles.transport_type_container}>
          {transports.map((type, index) => (
            <View key={index} style={[styles.transport_btn_wrapper]}>
              <AnimatedPressable
                style={[
                  styles.transport_btn,
                  tranportType === type && styles.transport_selected,
                ]}
                onPress={() => setTransportType(type)}
              >
                <Text
                  style={[
                    styles.transport_value,
                    tranportType === type && styles.transport_value_selected,
                  ]}
                >
                  {type}
                </Text>
              </AnimatedPressable>
            </View>
          ))}
        </View>

        <Spacer height={28} />
        <View style={styles.delivery_container}>
          <Text style={styles.delivery_title}>Delivery Address</Text>
          <View style={{}}>
            <Text style={styles.city}>JL.Kpg Sutoyo</Text>
            <Text style={styles.address}>
              Kpg. Sutoyo No. 620, Bilzen, Tanjungbailai.
            </Text>
          </View>
          <View style={styles.action_btns_container}>
            <View style={styles.action_btn}>
              <Text style={styles.action_text}>Edit Address</Text>
            </View>
            <View style={styles.action_btn}>
              <Text style={styles.action_text}>Add Note</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 1,
            marginVertical: 16,
            marginHorizontal: 4,
            backgroundColor: Colors.grey_line,
          }}
        ></View>

        <View style={styles.coffees_container}>
          <View style={styles.coffee_detail_container}>
            <View style={styles.coffee_detail_description}>
              <View style={styles.coffee_img_container}>
                <Image style={styles.coffee_image} alt="Coffee Mini Image" resizeMode="cover"/>
              </View>
              <View>
                <Text style={styles.coffee_name}>Caffe Mocha</Text>
                <Text style={styles.coffee_tags}>Deep Foam</Text>
              </View>
            </View>
            <View style={styles.cart_action_btns}>
              <View style={styles.modify_coffee_count}>
                <Text>-</Text>
              </View>
              <Text style={styles.coffee_count}>1</Text>
              <View style={styles.modify_coffee_count}>
                <Text>+</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaViewWrapper>
  );
};

export default order;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
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
    gap: 16
  },

  coffee_img_container:{
    height: 54,
    width: 54,
    borderRadius: 8,
    overflow: "hidden"
  },
  coffee_image:{
    width: "100%",
    height: "100%"
  },
  coffee_name:{
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal
  },
  coffee_tags:{
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light
  },
  cart_action_btns:{
     display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  modify_coffee_count: {
    height: 24,
    width: 24,
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  coffee_count: {
    fontFamily: fonts.semibold,
    color: Colors.grey_normal,
    fontSize: 14
  }

});
