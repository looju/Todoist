import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/Utils/Cache";
import { useColorScheme } from "react-native";
import { Colors } from "@/Constants/Colors";

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  const InitialUserLayout = () => {
    const colorMode = useColorScheme();
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor:
              colorMode == "dark" ? Colors.black : Colors.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    );
  };
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialUserLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
