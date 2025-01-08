import { Colors } from "@/Constants/Colors";
import { TouchableOpacity, Button, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Link, useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.backgroundAlt },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Browse",
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          presentation: "modal",
          headerTransparent: true,
          headerRight: () => (
            <Button
              title="Done"
              onPress={() => router.dismiss()}
              color={Colors.primary}
            />
          ),
        }}
      />
      <Stack.Screen
        name="NewProject"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const HeaderLeft = () => {
  const { user } = useUser();

  return (
    <Image
      source={
        user?.imageUrl
          ? { uri: user?.imageUrl }
          : require("@/assets/images/Unknown.png")
      }
      style={{ width: 32, height: 32, borderRadius: 16 }}
    />
  );
};

const HeaderRight = () => {
  return (
    <Link href="/(authenticated)/(tabs)/(browse)/settings" asChild>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </Link>
  );
};

export default Layout;
