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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

interface MenuItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  hasToggle?: boolean;
  hasChevron?: boolean;
  onPress?: () => void;
}

const Profile = () => {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const menuItems: MenuItem[] = [
    {
      id: "orders",
      icon: "receipt-outline",
      label: "My Orders",
      value: "12 orders",
      hasChevron: true,
    },
    {
      id: "payment",
      icon: "card-outline",
      label: "Payment Methods",
      hasChevron: true,
    },
    {
      id: "address",
      icon: "location-outline",
      label: "Delivery Address",
      hasChevron: true,
    },
    {
      id: "notifications",
      icon: "notifications-outline",
      label: "Notifications",
      hasToggle: true,
    },
    {
      id: "darkmode",
      icon: "moon-outline",
      label: "Dark Mode",
      hasToggle: true,
    },
    {
      id: "help",
      icon: "help-circle-outline",
      label: "Help & Support",
      hasChevron: true,
    },
    {
      id: "about",
      icon: "information-circle-outline",
      label: "About",
      hasChevron: true,
    },
  ];

  const getToggleValue = (id: string) => {
    if (id === "notifications") return notificationsEnabled;
    if (id === "darkmode") return darkModeEnabled;
    return false;
  };

  const handleToggle = (id: string) => {
    if (id === "notifications") setNotificationsEnabled(!notificationsEnabled);
    if (id === "darkmode") setDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <SafeAreaViewWrapper>
      <Navbar title="Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer height={16} />
        <View style={styles.container}>
          {/* Profile Header */}
          <FadeInView style={styles.profile_header}>
            <View style={styles.avatar_container}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
                }}
                style={styles.avatar}
              />
              <AnimatedPressable style={styles.edit_avatar_btn}>
                <Ionicons name="camera" size={14} color="white" />
              </AnimatedPressable>
            </View>
            <Text style={styles.profile_name}>John Doe</Text>
            <Text style={styles.profile_email}>johndoe@email.com</Text>
          </FadeInView>

          <Spacer height={24} />

          {/* Stats Section */}
          <FadeSlideInView delay={100} style={styles.stats_container}>
            <View style={styles.stat_item}>
              <Text style={styles.stat_value}>12</Text>
              <Text style={styles.stat_label}>Orders</Text>
            </View>
            <View style={styles.stat_divider} />
            <View style={styles.stat_item}>
              <Text style={styles.stat_value}>₦ {formatCurrency(25000)}</Text>
              <Text style={styles.stat_label}>Wallet</Text>
            </View>
            <View style={styles.stat_divider} />
            <View style={styles.stat_item}>
              <Text style={styles.stat_value}>6</Text>
              <Text style={styles.stat_label}>Favorites</Text>
            </View>
          </FadeSlideInView>

          <Spacer height={24} />

          {/* Loyalty Card */}
          <FadeSlideInView delay={150} style={styles.loyalty_card}>
            <View style={styles.loyalty_header}>
              <View style={styles.loyalty_icon_container}>
                <Ionicons name="gift" size={24} color={Colors.brown_normal} />
              </View>
              <View style={styles.loyalty_info}>
                <Text style={styles.loyalty_title}>Coffee Rewards</Text>
                <Text style={styles.loyalty_subtitle}>
                  3 more to get free coffee!
                </Text>
              </View>
            </View>
            <View style={styles.loyalty_progress_container}>
              {[...Array(8)].map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.loyalty_dot,
                    index < 5 && styles.loyalty_dot_filled,
                  ]}
                >
                  {index < 5 && (
                    <Ionicons name="cafe" size={12} color="white" />
                  )}
                </View>
              ))}
            </View>
          </FadeSlideInView>

          <Spacer height={24} />

          {/* Menu Items */}
          <FadeSlideInView delay={200} style={styles.menu_container}>
            {menuItems.map((item, index) => (
              <StaggeredItem key={item.id} index={index} staggerDelay={50}>
                <AnimatedPressable
                  style={styles.menu_item}
                  onPress={item.onPress}
                >
                  <View style={styles.menu_left}>
                    <View style={styles.menu_icon_container}>
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={Colors.brown_normal}
                      />
                    </View>
                    <Text style={styles.menu_label}>{item.label}</Text>
                  </View>
                  <View style={styles.menu_right}>
                    {item.value && (
                      <Text style={styles.menu_value}>{item.value}</Text>
                    )}
                    {item.hasToggle && (
                      <Switch
                        value={getToggleValue(item.id)}
                        onValueChange={() => handleToggle(item.id)}
                        trackColor={{
                          false: Colors.grey_line,
                          true: Colors.brown_light,
                        }}
                        thumbColor={
                          getToggleValue(item.id)
                            ? Colors.brown_normal
                            : Colors.grey_light
                        }
                      />
                    )}
                    {item.hasChevron && (
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={Colors.grey_light}
                      />
                    )}
                  </View>
                </AnimatedPressable>
                {index < menuItems.length - 1 && (
                  <View style={styles.menu_divider} />
                )}
              </StaggeredItem>
            ))}
          </FadeSlideInView>

          <Spacer height={24} />

          {/* Logout Button */}
          <FadeSlideInView delay={300}>
            <AnimatedPressable style={styles.logout_btn}>
              <Ionicons
                name="log-out-outline"
                size={20}
                color={Colors.promo_red}
              />
              <Text style={styles.logout_text}>Log Out</Text>
            </AnimatedPressable>
          </FadeSlideInView>

          <Spacer height={16} />

          {/* App Version */}
          <FadeInView style={styles.version_container}>
            <Text style={styles.version_text}>Version 1.0.0</Text>
          </FadeInView>
        </View>
        <Spacer height={100} />
      </ScrollView>
    </SafeAreaViewWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },

  profile_header: {
    alignItems: "center",
    gap: 8,
  },

  avatar_container: {
    position: "relative",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.brown_normal,
  },

  edit_avatar_btn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.brown_normal,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },

  profile_name: {
    fontFamily: fonts.semibold,
    fontSize: 22,
    color: Colors.grey_normal,
    marginTop: 8,
  },

  profile_email: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: Colors.grey_light,
  },

  stats_container: {
    flexDirection: "row",
    backgroundColor: Colors.brown_light,
    borderRadius: 16,
    padding: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },

  stat_item: {
    alignItems: "center",
    gap: 4,
  },

  stat_value: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  stat_label: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
  },

  stat_divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.grey_line,
  },

  loyalty_card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.grey_line,
  },

  loyalty_header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  loyalty_icon_container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.brown_light,
    alignItems: "center",
    justifyContent: "center",
  },

  loyalty_info: {
    flex: 1,
  },

  loyalty_title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.grey_normal,
  },

  loyalty_subtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
    marginTop: 2,
  },

  loyalty_progress_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  loyalty_dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.grey_line,
    alignItems: "center",
    justifyContent: "center",
  },

  loyalty_dot_filled: {
    backgroundColor: Colors.brown_normal,
  },

  menu_container: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.grey_line,
  },

  menu_item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  menu_left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  menu_icon_container: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.brown_light,
    alignItems: "center",
    justifyContent: "center",
  },

  menu_label: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: Colors.grey_normal,
  },

  menu_right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  menu_value: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: Colors.grey_light,
  },

  menu_divider: {
    height: 1,
    backgroundColor: Colors.grey_line,
    marginHorizontal: 12,
  },

  logout_btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.promo_red,
    backgroundColor: "white",
  },

  logout_text: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: Colors.promo_red,
  },

  version_container: {
    alignItems: "center",
  },

  version_text: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.grey_light,
  },
});
