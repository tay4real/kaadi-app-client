import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const Button = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
  pending,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
        { flexDirection: "row", justifyContent: "center" },
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
          { paddingRight: 3, marginRight: 3 },
        ]}
      >
        {text}
      </Text>
      {pending && <ActivityIndicator size="small" color="#ffffff" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    borderRadius: 6,
  },

  container_PRIMARY: {
    backgroundColor: "#1935DE",
  },

  container_SECONDARY: {
    borderColor: "#1935DE",
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: "600",
    color: "white",
    fontStyle: "normal",
    lineHeight: 16,
    fontSize: 14,
  },

  text_SECONDARY: {
    color: "#3B71F3",
  },

  text_TERTIARY: {
    color: "gray",
  },
});

export default Button;
