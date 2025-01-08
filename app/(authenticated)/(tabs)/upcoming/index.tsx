import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Fab from "@/Components/Fab";

const Layout = () => {
  return (
    <SafeAreaView style={Styles.main}>
      <Text>Layout</Text>
      <Fab />
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default Layout;
