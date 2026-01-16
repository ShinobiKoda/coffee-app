import { FontProvider } from "@/providers/FontProviders";
import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <FontProvider>
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
      </Stack>
    </FontProvider>
  );
};

export default RootLayout;
