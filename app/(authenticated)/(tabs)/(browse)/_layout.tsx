import MoreButton from "@/Components/MoreButton";
import { Colors } from "@/Constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Image, useColorScheme } from "react-native";

export default function Layout() {
  const colorScheme = useColorScheme();
  const HeaderLeft = () => {
    const { user } = useUser();
    return (
      <Image source={{ uri: user?.imageUrl }} className="w-8 h-8 rounded-2xl" />
    );
  };

  const HeaderRight = () => {
    return (
      <Link href={"/(authenticated)/(tabs)/(browse)/settings"}>
        <Ionicons name="settings-outline" size={24} color={Colors.primary} />
      </Link>
    );
  };
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colorScheme == "dark" ? Colors.black : Colors.white,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Browse",
          headerLargeTitle: true,
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
          headerSearchBarOptions: {
            placeholder: "Search tasks, projects, more...",
            tintColor: Colors.primary,
          },
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          headerLargeTitle: true,
          headerLeft: () => <HeaderLeft />,
        }}
      />
    </Stack>
  );
}
