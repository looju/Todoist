import { Text, View, Image, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
export default function Index() {
  const { top } = useSafeAreaInsets();
  const { startOAuthFlow: googleOauth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: appleOauth } = useOAuth({ strategy: "oauth_apple" });

  const handleAppleOAuth = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await appleOauth({
        redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
      });
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {}
  }, []);

  const handleGoogleOAuth = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await googleOauth({
        redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
      });
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {}
  }, []);

  const openLink = async () => {
    await WebBrowser.openBrowserAsync("https://galaxies.dev");
  };

  return (
    <View className="gap-[40] mt-5" style={{ paddingTop: top }}>
      <Image
        source={require("@/assets/images/todoist-logo.png")}
        resizeMode="contain"
        className="self-center h-10"
      />
      <Image
        source={require("@/assets/images/login.png")}
        resizeMode="contain"
        className="self-center h-64"
      />
      <View className="gap-5 mx-10">
        <TouchableOpacity
          className="flex-row items-center justify-center p-[10]"
          onPress={handleAppleOAuth}
        >
          <Ionicons name="logo-apple" size={10} />
          <Text className="text-sm">Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
