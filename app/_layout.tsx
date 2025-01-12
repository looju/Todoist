import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/Utils/Cache";
import { ActivityIndicator, View, useColorScheme } from "react-native";
import { Colors } from "@/Constants/Colors";
import { createContext, useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { Toaster } from "sonner-native";
import { RealmProvider } from "@realm/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import initializeDB from "@/Schema/InitializeDb";

export const AppContext = createContext({});

export default function RootLayout() {
  const [db, setDb] = useState<any>(null);
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  useEffect(() => {
    const initDB = async () => {
      const db = await initializeDB();
      setDb(db);
    };
    initDB().then();
  }, [db]);

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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"small"} color={Colors.primary} />
        </View>
      );
    }
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    );
  };
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <AppContext.Provider value={{ db }}>
        <PaperProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <InitialUserLayout />
            <Toaster />
          </GestureHandlerRootView>
        </PaperProvider>
      </AppContext.Provider>
    </ClerkProvider>
  );
}
