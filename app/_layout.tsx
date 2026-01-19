import BlurredStatusBar from "@/components/BlurredStatusBar";
import { FontProvider } from "@/providers/FontProviders";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const RootLayout = () => {
  return (
    <FontProvider>
      <View style={{ flex: 1 }}>
        <BlurredStatusBar />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="dashboard"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="coffee/[id]"
            options={{
              headerShown: false,
            }}
          />
           <Stack.Screen
            name="order"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </View>
    </FontProvider>
  );
};

export default RootLayout;
