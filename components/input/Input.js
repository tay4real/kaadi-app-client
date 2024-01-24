import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";


const Input = ({
  hidePassword,
  control,
  name,
  rules = {},
  placeholder,
  secure,
  togglePassword,
  style,
}) => {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <>
            <View
              style={[
                styles.container,
                { borderColor: error ? "red" : "#e8e8e8" },
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={hidePassword}
              />
              {secure &&
                (hidePassword ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={togglePassword}
                  >
                    <MaterialIcons
                      name="visibility-off"
                      size={24}
                      color="#828282"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={togglePassword}
                  >
                    <MaterialIcons
                      name="visibility"
                      size={24}
                      color="#828282"
                    />
                  </TouchableOpacity>
                ))}
            </View>
            {error && (
              <Text style={{ color: "red", alignSelf: "stretch" }}>
                {error.message || "Error"}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0E0E0",
    flex: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 45,
  },
  input: {
    height: 60,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 15,
    letterSpacing: -0.02,
    flex: 1,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: { fontWeight: "500", fontSize: 16 },
});

export default Input;
