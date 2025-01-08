import MoreButton from "@/Components/MoreButton";
import { Colors } from "@/Constants/Colors";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function Layout() {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: Colors.white,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Today",
          headerLargeTitle: true,
          headerRight: () => <MoreButton pageName="Today" />,
        }}
      />
    </Stack>
  );
}
