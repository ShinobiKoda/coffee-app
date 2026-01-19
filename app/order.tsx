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
});
