import Navbar from "@/components/Navbar";
import SafeAreaViewWrapper from "@/components/SafeAreaViewWrapper";
import Spacer from "@/components/Spacer";
import { AnimatedPressable } from "@/components/animations/Reanimated";
import { Colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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

        <Spacer height={28}/>
        <View style={styles.delivery_container}>
          <Text style={styles.delivery_title}>Delivery Address</Text>
          <View style={{}}>
            <Text style={styles.city}>JL.Kpg Sutoyo</Text>
            <Text style={styles.address}>Kpg. Sutoyo No. 620, Bilzen, Tanjungbailai.</Text>
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
  delivery_container:{
    display: "flex",
    flexDirection: "column",
    gap: 16
  },
  delivery_title:{
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal
  },
  city:{
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: Colors.grey_normal,

  },
  address:{
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light
  },
  action_btns_container:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  action_btn:{
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: Colors.grey_light,
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1
  },

  action_text:{
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_normal
  }

});
