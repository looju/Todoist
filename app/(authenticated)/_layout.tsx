import { Colors } from "@/Constants/Colors";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: Colors.white } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(task)"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}
