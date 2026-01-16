import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          paddingTop: 20,
          paddingHorizontal: 20,
          height: 99,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "home" : "home-outline"}
              color={focused ? "#C67C4E" : "#C67C4E"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "heart" : "heart-outline"}
              color={focused ? "#C67C4E" : "#C67C4E"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "bag" : "bag-outline"}
              color={focused ? "#C67C4E" : "#C67C4E"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={24}
              name={focused ? "person" : "person-outline"}
              color={focused ? "#C67C4E" : "#C67C4E"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;
