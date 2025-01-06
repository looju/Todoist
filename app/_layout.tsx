import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/Utils/Cache";
import { ActivityIndicator, View, useColorScheme } from "react-native";
import { Colors } from "@/Constants/Colors";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  const InitialUserLayout = () => {
    const colorMode = useColorScheme();
    const router = useRouter();
    const segments = useSegments();
    const pathName = usePathname();
    const { isLoaded, isSignedIn } = useAuth();

    useEffect(() => {
      const isAuthGroup = segments[0] === "(authenticated)";
      if (!isLoaded) return;
      if (isSignedIn && !isAuthGroup) {
        router.replace("/(authenticated)/(tabs)/today");
      } else if (!isSignedIn && isAuthGroup) {
        router.replace("/");
      }
    }, []);

    if (!isLoaded) {
      return (
        <View className="flex justify-center items-center">
          <ActivityIndicator size={"small"} color={Colors.primary} />
        </View>
      );
    }
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
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Toaster />
          <InitialUserLayout />
        </GestureHandlerRootView>
      </PaperProvider>
    </ClerkProvider>
  );
}
