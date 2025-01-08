import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as Haptics from "expo-haptics";
import { Colors } from "@/Constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("screen");
const Fab = () => {
  const router = useRouter();
  const handleOnPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/(authenticated)/(task)");
  };
  return (
    <TouchableOpacity style={styles.fab} onPress={handleOnPress}>
      <Ionicons name="add" size={28} color={"white"} />
    </TouchableOpacity>
  );
};

export default Fab;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    zIndex: 1000,
    padding: 10,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    top: height * 0.68,
    boxShadow: "5px 4px 6px rgba(0,0,0,0.2)",
  },
});
