import { Text, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
export default function Index() {
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
