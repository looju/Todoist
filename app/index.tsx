import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/Constants/Colors";
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
    await WebBrowser.openBrowserAsync("https://github.com/looju");
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
          className="flex-row items-center justify-center p-[10] rounded-md border-2 border-neutral-50"
          onPress={handleAppleOAuth}
        >
          <Ionicons name="logo-apple" size={10} />
          <Text className="text-sm">Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-center p-[10] rounded-md border-2 border-neutral-50"
          onPress={handleGoogleOAuth}
        >
          <Ionicons name="logo-google" size={10} />
          <Text className="text-sm">Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-center p-[10] rounded-md border-2 border-neutral-50">
          <Ionicons name="mail" size={10} />
          <Text className="text-sm">Continue with Email</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          By continuing you agree to Todoist's{" "}
          <Text style={styles.link} onPress={openLink}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={openLink}>
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    marginTop: 20,
  },
  loginImage: {
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
  },
  banner: {
    height: 280,
    resizeMode: "contain",
  },
  title: {
    marginHorizontal: 50,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40,
  },
  btn: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 6,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.lightBorder,
    borderWidth: StyleSheet.hairlineWidth,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "500",
  },
  description: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.black,
  },
  link: {
    color: Colors.blue,
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
