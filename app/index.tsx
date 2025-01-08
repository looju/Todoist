import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/Constants/Colors";
import { useRouter } from "expo-router";
export default function Index() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { startOAuthFlow: googleOauth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: appleOauth } = useOAuth({ strategy: "oauth_apple" });

  const handleAppleOAuth = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await appleOauth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {}
  }, []);

  const handleGoogleOAuth = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await googleOauth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (error) {}
  }, []);

  const openLink = async () => {
    // await WebBrowser.openBrowserAsync("https://github.com/looju");
    router.replace("/(authenticated)/(tabs)/today");
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: top }]}>
      <Image
        source={require("@/assets/images/todoist-logo.png")}
        style={styles.loginImage}
      />
      <Image
        source={require("@/assets/images/login.png")}
        style={styles.banner}
      />
      <Text style={styles.title}>Organize your work and life, finally.</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.btn]} onPress={handleAppleOAuth}>
          <Ionicons name="logo-apple" size={24} />
          <Text style={[styles.btnText]}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn]} onPress={handleGoogleOAuth}>
          <Ionicons name="logo-google" size={24} />
          <Text style={[styles.btnText]}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn]} onPress={openLink}>
          <Ionicons name="mail" size={24} />
          <Text style={[styles.btnText]}>Continue with Email</Text>
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
    </ScrollView>
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
    marginHorizontal: 20,
    marginTop: 10,
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
    color: Colors.lightText,
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
