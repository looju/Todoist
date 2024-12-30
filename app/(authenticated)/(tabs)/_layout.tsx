import { Colors } from "@/Constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import * as Haptics from "expo-haptics";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenListeners={{
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      }}
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor:
          colorScheme == "light" ? Colors.dark : Colors.lightText,
        tabBarBackground: () => (
          <BlurView
            style={{ flex: 1 }}
            intensity={100}
            tint={
              colorScheme == "dark"
                ? "systemMaterialDark"
                : "systemMaterialLight"
            }
          />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          bottom: 0,
          left: 0,
          right: 0,
          position: "absolute",
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome size={focused ? 33 : 24} name="home" color={color} />
          ),
          header: () => null,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "Upcoming",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="calendar"
              color={color}
              size={focused ? 33 : 24}
            />
          ),
          headerTitle: "Latest Crypto",
          headerTransparent: true,
          headerBackground: (props) => (
            <BlurView
              style={{ flex: 1 }}
              intensity={100}
              tint="systemUltraThinMaterialDark"
            />
          ),
          headerTitleStyle: { color: Colors.white },
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="file1" color={color} size={focused ? 33 : 24} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="search1" color={color} size={focused ? 33 : 24} />
          ),
        }}
      />
    </Tabs>
  );
}
