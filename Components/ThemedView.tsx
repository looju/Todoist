import { Colors } from "@/Constants/Colors";
import { View, useColorScheme, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const color = useColorScheme();

  return (
    <View
      style={[
        { backgroundColor: color == "dark" ? Colors.black : Colors.background },
        style,
      ]}
      {...otherProps}
    />
  );
}
