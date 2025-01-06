import React from "react";
import { Stack } from "expo-router";
import { Button, Text, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

const Layout = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Page</Text>
      <Button title="sign out" onPress={() => signOut()} />
    </View>
  );
};

export default Layout;
