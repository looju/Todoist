import React from "react";
import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import Fab from "@/Components/Fab";

const Layout = () => {
  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Search</Text>
        </View>
      </ScrollView>
      <Fab />
    </>
  );
};

export default Layout;
